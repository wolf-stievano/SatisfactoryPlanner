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
	BaseProductionRate float64            `json:"base_production_rate"`
	MaxProductionRate  float64            `json:"max_production_rate"`
	Time               float64            `json:"time"`
}

type Machine struct {
	Name              string  `json:"name"`
	PowerUsage        int     `json:"power_usage"`
	DefaultEfficiency float64 `json:"default_efficiency"`
}

func AdjustedEfficiency(recipe Recipe, machine Machine, outputRequired float64) float64 {
	if outputRequired < recipe.BaseProductionRate {
		return outputRequired / recipe.BaseProductionRate
	}
	return machine.DefaultEfficiency
}

func AdjustedProduction(recipe Recipe, machine Machine, outputRequired float64) (float64, float64) {
	efficiency := AdjustedEfficiency(recipe, machine, outputRequired)
	adjustedProduction := recipe.BaseProductionRate * efficiency
	return adjustedProduction, efficiency
}

func CalculateResourcesForProduction(recipes []Recipe, machines []Machine, outputRequired float64, product string) {
	for _, recipe := range recipes {
		if _, exists := recipe.Output[product]; exists {
			var machine Machine
			for _, m := range machines {
				if m.Name == recipe.Machine {
					machine = m
					break
				}
			}

			adjustedProduction, efficiency := AdjustedProduction(recipe, machine, outputRequired)

			fmt.Printf("Para produzir %.2f %s por minuto, você precisará de:\n", adjustedProduction, product)
			for input, quantity := range recipe.Inputs {
				totalInput := ((quantity * outputRequired) / recipe.BaseProductionRate) * 10
				fmt.Printf("- %.2f unidades de %s\n", totalInput, input)
			}

			fmt.Printf("Você usará a máquina %s em %.2f%% de eficiência.\n", recipe.Machine, efficiency*100)
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

func LoadMachines(filename string) ([]Machine, error) {
	file, err := os.Open(filename)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	var machines []Machine
	err = json.NewDecoder(file).Decode(&machines)
	if err != nil {
		return nil, err
	}
	return machines, nil
}

func main() {
	recipes, err := LoadRecipes("Recipes.json")
	if err != nil {
		log.Fatal(err)
	}
	machines, err := LoadMachines("Machines.json")
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

	CalculateResourcesForProduction(recipes, machines, outputRequired, product)
}
