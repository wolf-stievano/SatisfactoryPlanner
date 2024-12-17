package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

type Recipe struct {
	Name               string             `json:"name"`
	Inputs             map[string]float64 `json:"inputs"`
	Output             map[string]float64 `json:"output"`
	Machine            string             `json:"machine"`
	Power              int                `json:"power" `
	BaseProductionRate float64            `json:"base_production_rate"`
	Time               float64            `json:"time"`
}

func AdjustedEfficiency(recipe Recipe, outputRequired float64) float64 {
	if outputRequired < recipe.BaseProductionRate {
		return outputRequired / recipe.BaseProductionRate
	}
	return 1.0
}

func AdjustedProduction(recipe Recipe, outputRequired float64) (float64, float64) {
	efficiency := AdjustedEfficiency(recipe, outputRequired)
	adjustedProduction := recipe.BaseProductionRate * efficiency
	return adjustedProduction, efficiency
}

func CalculateResourcesForProduction(recipes []Recipe, outputRequired float64, product string) {

	for _, recipe := range recipes {
		if _, exists := recipe.Output[product]; exists {

			adjustedProduction, efficiency := AdjustedProduction(recipe, outputRequired)

			fmt.Printf("Para produzir %.2f %s por minuto, você precisará de:\n", adjustedProduction, product)
			for input, quantity := range recipe.Inputs {
				totalInput := ((quantity * outputRequired) / recipe.BaseProductionRate) * 10
				fmt.Printf("- %.2f unidades de %s\n", totalInput, input)
			}

			fmt.Printf("Você usará a máquina %s consumindo %d MW, com eficiência de %.2f%%.\n", recipe.Machine, recipe.Power, efficiency*100)
			return
		}
	}
	fmt.Println("Produto não encontrado.")
}

func LoadRecipes(filename string) ([]Recipe, error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var recipes []Recipe
	err = json.NewDecoder(file).Decode(&recipes)
	if err != nil {
		return nil, err
	}
	return recipes, nil
}

func main() {
	recipes, err := LoadRecipes("Recipes.json")
	if err != nil {
		log.Fatal(err)
	}

	reader := bufio.NewReader(os.Stdin)

	fmt.Println("Digite o nome do produto que deseja fabricar:")
	product, _ := reader.ReadString('\n')
	product = strings.TrimSpace(product)

	fmt.Println("Digite a quantidade desejada por minuto:")
	quantityStr, _ := reader.ReadString('\n')
	quantityStr = strings.TrimSpace(quantityStr)

	outputRequired, err := strconv.ParseFloat(quantityStr, 64)
	if err != nil {
		fmt.Println("Erro ao inserir a quantidade. Certifique-se de inserir um número válido.")
		return
	}

	CalculateResourcesForProduction(recipes, outputRequired, product)
}
