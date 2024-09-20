
import Image from 'next/image';
import satisfactoryBg from '../public/Satisfactory-bg.jpg'; // Importe a imagem

export default function Background() {
        return (
                <div className="relative w-full h-screen">
                        <Image
                                alt="Satisfactory Background"
                                src={satisfactoryBg} // Use a imagem importada
                                placeholder="blur" // O Next.js gera automaticamente o blur
                                quality={100}
                                fill
                                sizes="100vw"
                                style={{
                                        objectFit: 'cover',
                                }}
                        />
                </div>
        );
}
