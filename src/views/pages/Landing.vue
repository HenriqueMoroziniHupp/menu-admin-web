<script setup>
const smoothScroll = (id) => {
    document.body.click();
    document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
    });
};
</script>

<template>
    <div class="bg-surface-0 dark:bg-surface-900">
        <div id="home" class="landing-wrapper overflow-hidden">
            <div class="py-2 px-6 mx-0 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static">
                <a class="flex items-center w-full" href="#">
                    <Image src="/pwa-192x192.png" alt="Logo" width="50" height="54" class="mr-2"/>
                    <span class="text-surface-900 dark:text-surface-0 font-medium text-2xl leading-normal mr-20">UPZINI</span>
                </a>
                <Button
                    class="lg:!hidden"
                    text
                    severity="secondary"
                    rounded
                    v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                >
                    <i class="pi pi-bars !text-2xl"></i>
                </Button>
                <div class="items-center bg-surface-0 dark:bg-surface-900 grow justify-between hidden lg:flex absolute lg:static w-full left-0 top-full px-12 lg:px-0 z-20 rounded-border pb-6 lg:pb-0">
                    <ul class="list-none p-0 m-0 flex lg:items-center select-none flex-col lg:flex-row cursor-pointer gap-8">
                        <li>
                            <a @click="smoothScroll('#hero')" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                                <span>Home</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('#features')" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                                <span>Vantagens</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('#highlights')" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                                <span>Destaques</span>
                            </a>
                        </li>
                        <li>
                            <a @click="smoothScroll('#pricing')" class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl">
                                <span>Preço</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div
                id="hero"
                class="flex flex-col pt-6 px-0 md:px-6 lg:px-20 overflow-hidden"
                style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(238, 239, 175) 0%, rgb(195, 227, 250) 100%); clip-path: ellipse(150% 87% at 93% 13%)"
            >
                <div class="mx-6 md:mx-20 mt-0 md:mt-6">
                    <h1 class="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                        <span class="font-light block mb-2 md:mb-4">Simplifique seu cardápio</span>
                        Digital, Moderno e Elegante</h1>
                    <p class="font-normal text-xl md:text-2xl leading-normal pt-2 md:mt-4 text-gray-700">Uma nova experiência. Destaque seus pratos com belas imagens e impulsione seu negócio</p>
                    <Button label="Quero Contratar" as="router-link" to="/" rounded class="!text-lg md:!text-xl mt-8 !px-4"></Button>
                    <Button label="Ver Demonstração" as="a" href="https://pioneiro.upzini.com" target="_blank" rel="noopener" rounded class="!text-lg md:!text-xl mt-8 ml-4 !px-4"></Button>
                </div>
                <div class="flex justify-center md:justify-end mt-6 md:mt-0">
                    <img src="/demo/images/landing/screen.webp" alt="Hero Image" class="md:w-8/12 w-auto" />
                </div>
            </div>

            <div id="features" class="py-6 px-6 lg:px-20 mt-8 mx-0 lg:mx-20">
                <div class="grid grid-cols-12 gap-4 justify-center">
                    <div class="col-span-12 text-center mt-20 mb-6">
                        <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl">Vantagens para você</div>
                        <span class="text-muted-color text-2xl">Facilidade para seus clientes</span>
                    </div>

                    <div class="feature-card col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
                        <div
                            class="card-background"
                            style="background: linear-gradient(90deg, rgba(237, 165, 165, 0.2), rgba(246, 158, 188, 0.2)), linear-gradient(180deg, rgba(225, 202, 166, 0.2), rgba(221, 162, 187, 0.2))"
                        >
                            <div class="card-content p-4 bg-surface-0 dark:bg-surface-900 h-full">
                                <div class="card-icon flex items-center justify-center bg-red-200 mb-4">
                                    <i class="pi pi-fw pi-heart !text-2xl text-red-700"></i>
                                </div>
                                <div class="mb-1 text-surface-900 dark:text-surface-0 text-xl">Destaque seu produto</div>
                                <span class="text-surface-600 dark:text-surface-200">Desperte o desejo de consumo com fotos de tirar o folego</span>
                            </div>
                        </div>
                    </div>

                    <div class="feature-card col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
                        <div
                            class="card-background"
                            style="background: linear-gradient(90deg, rgba(251, 219, 137, 0.2), rgba(187, 199, 205, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(187, 199, 205, 0.2))"
                        >
                            <div class="card-content p-4 bg-surface-0 dark:bg-surface-900 h-full">
                                <div class="card-icon flex items-center justify-center bg-yellow-200 mb-4">
                                    <i class="pi pi-fw pi-star !text-2xl text-yellow-700"></i>
                                </div>
                                <h5 class="mb-1 text-surface-900 dark:text-surface-0 text-xl">Fácil de usar</h5>
                                <span class="text-surface-600 dark:text-surface-200">Interface intuitiva, simples e direto ao ponto</span>
                            </div>
                        </div>
                    </div>

                    <div class="feature-card col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
                        <div
                            class="card-background"
                            style="background: linear-gradient(90deg, rgba(155, 155, 156, 0.2), rgba(251, 199, 145, 0.2)), linear-gradient(180deg, rgba(253, 228, 165, 0.2), rgba(145, 210, 204, 0.2))"
                        >
                            <div class="card-content p-4 bg-surface-0 dark:bg-surface-900 h-full">
                                <div class="card-icon flex items-center justify-center bg-slate-200 mb-4">
                                    <i class="pi pi-fw pi-qrcode !text-2xl text-slate-700"></i>
                                </div>
                                <div class="mb-1 text-surface-900 dark:text-surface-0 text-xl">Acesso via QR Code</div>
                                <span class="text-surface-600 dark:text-surface-200">Personalize e baixe seu QRCode para usar como quiser</span>
                            </div>
                        </div>
                    </div>

                    <div class="feature-card col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
                        <div
                            class="card-background"
                            style="background: linear-gradient(90deg, rgba(145, 226, 237, 0.2), rgba(251, 199, 145, 0.2)), linear-gradient(180deg, rgba(101, 206, 238, 0.2), rgba(172, 180, 223, 0.2))"
                        >
                            <div class="card-content p-4 bg-surface-0 dark:bg-surface-900 h-full">
                                <div class="card-icon flex items-center justify-center bg-cyan-200 mb-4">
                                    <i class="pi pi-fw pi-pen-to-square !text-2xl text-cyan-700"></i>
                                </div>
                                <h5 class="mb-1 text-surface-900 dark:text-surface-0 text-xl">Ajustes Instantâneo</h5>
                                <span class="text-surface-600 dark:text-surface-200">Adicione novos itens, altere imagem, preço, descrição e disponibilidade sempre que precisar</span>
                            </div>
                        </div>
                    </div>

                    <div class="feature-card col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
                        <div
                            class="card-background"
                            style="background: linear-gradient(90deg, rgba(145, 210, 204, 0.2), rgba(212, 162, 221, 0.2)), linear-gradient(180deg, rgba(145, 221, 251, 0.2), rgba(160, 210, 250, 0.2))"
                        >
                            <div class="card-content p-4 bg-surface-0 dark:bg-surface-900 h-full">
                                <div class="card-icon flex items-center justify-center bg-blue-200 mb-4">
                                    <i class="pi pi-fw pi-dollar !text-2xl text-blue-700"></i>
                                </div>
                                <div class="mb-1 text-surface-900 dark:text-surface-0 text-xl">Economize</div>
                                <span class="text-surface-600 dark:text-surface-200">Ajuste seu cardápio sem se preocupar em reimprimir ou rasurar seu cardápio</span>
                            </div>
                        </div>
                    </div>

                    <div class="feature-card col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 lg:pb-8 mt-6 lg:mt-0">
                        <div
                            class="card-background"
                            style="background: linear-gradient(90deg, rgba(243, 207, 135, 0.2), rgba(246, 158, 188, 0.2)), linear-gradient(180deg, rgba(237, 200, 145, 0.2), rgba(160, 210, 250, 0.2))"
                        >
                            <div class="card-content p-4 bg-surface-0 dark:bg-surface-900 h-full">
                                <div class="card-icon flex items-center justify-center bg-orange-200 mb-4">
                                    <i class="pi pi-fw pi-objects-column !text-2xl text-orange-700"></i>
                                </div>
                                <div class="mb-1 text-surface-900 dark:text-surface-0 text-xl ">Produtos e Categorias</div>
                                <span class="text-surface-600 dark:text-surface-200">Separe facilmente seus produtos por categorias</span>
                            </div>
                        </div>
                    </div>

                    <div class="feature-card col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 mt-6 lg:mt-0">
                        <div
                            class="card-background"
                            style="background: linear-gradient(90deg, rgba(142, 225, 216, 0.2), rgba(160, 210, 250, 0.2)), linear-gradient(180deg, rgba(171, 215, 238, 0.2), rgba(145, 210, 204, 0.2))"
                        >
                            <div class="card-content p-4 bg-surface-0 dark:bg-surface-900 h-full">
                                <div class="card-icon flex items-center justify-center bg-teal-200 mb-4">
                                    <i class="pi pi-fw pi-mobile !text-2xl text-teal-700"></i>
                                </div>
                                <div class="mb-1 text-surface-900 dark:text-surface-0 text-xl">Otimizado para Mobile</div>
                                <span class="text-surface-600 dark:text-surface-200">Gerencie todo seu cardápio facilmente pelo celular</span>
                            </div>
                        </div>
                    </div>

                    <div class="feature-card col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 mt-6 lg:mt-0">
                        <div
                            class="card-background"
                            style="background: linear-gradient(90deg, rgba(160, 210, 250, 0.2), rgba(212, 162, 221, 0.2)), linear-gradient(180deg, rgba(246, 158, 188, 0.2), rgba(212, 162, 221, 0.2))"
                        >
                            <div class="card-content p-4 bg-surface-0 dark:bg-surface-900 h-full">
                                <div class="card-icon flex items-center justify-center bg-purple-200 mb-4">
                                    <i class="pi pi-fw pi-search !text-2xl text-purple-700"></i>
                                </div>
                                <div class="mb-1 text-surface-900 dark:text-surface-0 text-xl">Busca Fácil</div>
                                <span class="text-surface-600 dark:text-surface-200">Seus clientes encontram facilmente o item ao buscar pelo nome</span>
                            </div>
                        </div>
                    </div>

                    <div class="feature-card col-span-12 md:col-span-12 lg:col-span-4 p-0 lg:pr-8 mt-6 lg:mt-0">
                        <div
                            class="card-background"
                            style="background: linear-gradient(90deg, rgba(251, 199, 145, 0.2), rgba(246, 158, 188, 0.2)), linear-gradient(180deg, rgba(172, 180, 223, 0.2), rgba(212, 162, 221, 0.2))"
                        >
                            <div class="card-content p-4 bg-surface-0 dark:bg-surface-900 h-full">
                                <div class="card-icon flex items-center justify-center bg-pink-200 mb-4">
                                    <i class="pi pi-fw pi-moon !text-2xl text-pink-700"></i>
                                </div>
                                <div class="mb-1 text-surface-900 dark:text-surface-0 text-lg">Modo Claro e Escuro</div>
                                <span class="text-surface-600 dark:text-surface-200">Alterna automaticamente de acordo com seu dispositivo</span>
                            </div>
                        </div>
                    </div>

                    <div
                        class="col-span-12 mt-20 mb-20 p-8 md:p-20"
                        style="border-radius: 20px; background: linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #efe1af 0%, #c3dcfa 100%)"
                    >
                        <div class="flex flex-col justify-center items-center text-center px-4 py-4 md:py-0">
                            <div class="text-gray-900 mb-2 text-3xl font-semibold">Steve Jobs</div>
                            <span class="text-gray-600 text-2xl">Cofundador da Apple</span>
                            <i class="text-gray-900 sm:line-height-2 md:line-height-4 text-2xl mt-6" style="max-width: 800px">
                                “As pessoas não sabem o que querem até mostrarmos a elas.”
                            </i>
                        </div>
                    </div>
                </div>
            </div>

            <div id="highlights" class="py-6 px-6 lg:px-20 mx-0 my-12 lg:mx-20">
                <div class="text-center">
                    <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl">Uma bela imagem</div>
                    <span class="text-muted-color text-2xl">Vale mais que mil palavras...</span>
                </div>

                <div class="grid grid-cols-12 gap-4 mt-20 pb-2 md:pb-20">
                    <div class="flex justify-center col-span-12 lg:col-span-6 bg-purple-100 p-0 order-1 lg:order-none" style="border-radius: 8px">
                        <img src="/demo/images/landing/mockup-menu.webp" class="w-11/12" alt="mockup mobile" />
                    </div>

                    <div class="col-span-12 lg:col-span-6 my-auto flex flex-col items-center lg:items-end text-center lg:text-right gap-4">
                        <div class="flex items-center justify-center bg-purple-200 self-center lg:self-end" style="width: 4.2rem; height: 4.2rem; border-radius: 10px">
                            <i class="pi pi-fw pi-mobile !text-4xl text-purple-700"></i>
                        </div>
                        <div class="leading-none text-surface-900 dark:text-surface-0 text-3xl font-normal">Seus pratos merecem ser vistos</div>
                        <span class="text-surface-700 dark:text-surface-100 text-xl sm:text-xl leading-normal" style="max-width: 650px"
                            >Já sentiu vontade de comer algo só de ver uma bela foto na rede social? Por que não fazer o mesmo com os seus pratos? 🤩</span
                        >
                    </div>
                </div>

                <div class="grid grid-cols-12 gap-4 my-20 py-2 md:py-20">
                    <div class="col-span-12 lg:col-span-6 my-auto flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
                        <div class="flex items-center justify-center bg-yellow-200 self-center lg:self-start" style="width: 4.2rem; height: 4.2rem; border-radius: 10px">
                            <i class="pi pi-fw pi-desktop !text-3xl text-yellow-700"></i>
                        </div>
                        <div class="leading-none text-surface-900 dark:text-surface-0 text-3xl font-normal">Ajuste, adicione, remova</div>
                        <span class="text-surface-700 dark:text-surface-100 text-xl sm:text-2xl leading-normal" style="max-width: 650px"
                            >Para que rasurar? Colar adesivo com novo preço? Dizer a todos clientes que o cardápio está desatualizado ou que o produto acabou? <br>💫 Basta ajustar seus itens feito mágica 🪄</span
                        >
                    </div>

                    <div class="flex justify-end order-1 sm:order-2 col-span-12 lg:col-span-6 bg-yellow-100 p-0" style="border-radius: 8px">
                        <img src="/demo/images/landing/mockup-desktop-products-new.webp" class="w-11/12" alt="mockup" />
                    </div>
                </div>

                <div class="grid grid-cols-12 gap-4 mt-20 pb-2 md:pt-20">
                    <div class="flex justify-center col-span-12 lg:col-span-6 bg-purple-100 p-0 order-1 lg:order-none" style="border-radius: 8px">
                        <img src="/demo/images/landing/mockup-admin-mobile.webp" class="w-11/12" alt="mockup mobile" />
                    </div>

                    <div class="col-span-12 lg:col-span-6 my-auto flex flex-col items-center lg:items-end text-center lg:text-right gap-4">
                        <div class="flex items-center justify-center bg-purple-200 self-center lg:self-end" style="width: 4.2rem; height: 4.2rem; border-radius: 10px">
                            <i class="pi pi-fw pi-mobile !text-4xl text-purple-700"></i>
                        </div>
                        <div class="leading-none text-surface-900 dark:text-surface-0 text-3xl font-normal">Controle na palma de sua mão</div>
                        <span class="text-surface-700 dark:text-surface-100 text-xl sm:text-2xl leading-normal" style="max-width: 650px"
                            >Tirou aquela foto top e deseja pôr no seu cardápio? Faça isso na mesma hora pelo celular. <br>Deixe seus clientes com ainda mais vontade 😋</span
                        >
                    </div>
                </div>
            </div>

            <div id="pricing" class="py-6 px-6 lg:px-20 my-2 md:my-6">
                <div class="text-center mb-6">
                    <div class="text-surface-900 dark:text-surface-0 font-normal mb-2 text-4xl">Preço de uma pizza</div>
                    <span class="text-muted-color text-2xl">Para impulsionar suas vendas</span>
                </div>

                <div class="grid grid-cols-12 gap-4 justify-between mt-20 md:mt-0">
                    <div class="col-span-12 lg:col-span-4 p-0 md:m-4 mt-6 md:mt-0 relative">
                        <div class="p-4 flex flex-col border-surface-200 dark:border-surface-600 pricing-card cursor-pointer border-2 hover:border-primary duration-300 transition-all" style="border-radius: 10px">
                            <div class="ribbon"><span class="!bg-red-400">Vagas Limitadas</span></div>
                            <div class="text-surface-900 dark:text-surface-0 text-center my-8 mb-2 text-3xl">Parceria</div>
                            <div class="my-8 flex flex-col items-center gap-4">
                                <div class="flex items-center">
                                    <span class="text-5xl font-bold mr-2 text-surface-900 dark:text-surface-0">R$0</span>
                                    <span class="text-surface-600 dark:text-surface-200">por mês</span>
                                </div>
                                <Button label="Entrar em Contato" class="p-button-rounded border-0 mt-4 font-light leading-tight bg-blue-500 text-white"></Button>
                            </div>
                            <Divider class="w-full bg-surface-200"></Divider>
                            <ul class="my-8 list-none p-0 flex text-surface-900 dark:text-surface-0 flex-col px-8">
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Cardápio online</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Gerador de QR Code</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Cadastro ilimitado de produtos</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Painel administrativo</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-span-12 lg:col-span-4 p-0 md:m-4 mt-6 md:mt-0">
                        <div class="p-4 flex flex-col border-surface-200 dark:border-surface-600 pricing-card cursor-pointer border-2 hover:border-primary duration-300 transition-all" style="border-radius: 10px">
                            <div class="text-surface-900 dark:text-surface-0 text-center my-8 mb-2 text-3xl">Mensal</div>
                            <div class="my-8 flex flex-col items-center gap-4">
                                <div class="flex items-center">
                                    <span class="text-5xl font-bold mr-2 text-surface-900 dark:text-surface-0">R$49</span>
                                    <span class="text-surface-600 dark:text-surface-200">por mês</span>
                                </div>
                                <Button label="Quero Contratar" class="p-button-rounded border-0 mt-4 font-light leading-tight bg-blue-500 text-white"></Button>
                            </div>
                            <Divider class="w-full bg-surface-200"></Divider>
                            <ul class="my-8 list-none p-0 flex text-surface-900 dark:text-surface-0 flex-col px-8">
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Cardápio online</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Gerador de QR Code</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Cadastro ilimitado de produtos</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Painel administrativo</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-span-12 lg:col-span-4 p-0 md:m-4 mt-6 md:mt-0 relative">
                        <div class="p-4 flex flex-col border-surface-200 dark:border-surface-600 pricing-card cursor-pointer border-2 hover:border-primary duration-300 transition-all" style="border-radius: 10px">
                            <div class="ribbon"><span>2 meses grátis</span></div>
                            <div class="text-surface-900 dark:text-surface-0 text-center my-8 mb-2 text-3xl">Anual</div>
                            <div class="my-8 flex flex-col items-center gap-4">
                                <div class="flex items-center">
                                    <span class="text-5xl font-bold mr-2 text-surface-900 dark:text-surface-0">R$499</span>
                                    <span class="text-surface-600 dark:text-surface-200">por ano</span>
                                </div>
                                <Button label="Quero Contratar" class="p-button-rounded border-0 mt-4 font-light leading-tight bg-blue-500 text-white"></Button>
                            </div>
                            <Divider class="w-full bg-surface-200"></Divider>
                            <ul class="my-8 list-none p-0 flex text-surface-900 dark:text-surface-0 flex-col px-8">
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Cardápio online</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Gerador de QR Code</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Cadastro ilimitado de produtos</span>
                                </li>
                                <li class="py-2">
                                    <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                    <span class="text-xl leading-normal">Painel administrativo</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="py-6 px-6 mx-0 mt-20 lg:mx-20">
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-12 md:col-span-2">
                        <a @click="smoothScroll('#home')" class="flex flex-wrap items-center justify-center md:justify-start md:mb-0 mb-4 cursor-pointer">
                            <svg viewBox="0 0 54 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-14 mr-2">
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M17.1637 19.2467C17.1566 19.4033 17.1529 19.561 17.1529 19.7194C17.1529 25.3503 21.7203 29.915 27.3546 29.915C32.9887 29.915 37.5561 25.3503 37.5561 19.7194C37.5561 19.5572 37.5524 19.3959 37.5449 19.2355C38.5617 19.0801 39.5759 18.9013 40.5867 18.6994L40.6926 18.6782C40.7191 19.0218 40.7326 19.369 40.7326 19.7194C40.7326 27.1036 34.743 33.0896 27.3546 33.0896C19.966 33.0896 13.9765 27.1036 13.9765 19.7194C13.9765 19.374 13.9896 19.0316 14.0154 18.6927L14.0486 18.6994C15.0837 18.9062 16.1223 19.0886 17.1637 19.2467ZM33.3284 11.4538C31.6493 10.2396 29.5855 9.52381 27.3546 9.52381C25.1195 9.52381 23.0524 10.2421 21.3717 11.4603C20.0078 11.3232 18.6475 11.1387 17.2933 10.907C19.7453 8.11308 23.3438 6.34921 27.3546 6.34921C31.36 6.34921 34.9543 8.10844 37.4061 10.896C36.0521 11.1292 34.692 11.3152 33.3284 11.4538ZM43.826 18.0518C43.881 18.6003 43.9091 19.1566 43.9091 19.7194C43.9091 28.8568 36.4973 36.2642 27.3546 36.2642C18.2117 36.2642 10.8 28.8568 10.8 19.7194C10.8 19.1615 10.8276 18.61 10.8816 18.0663L7.75383 17.4411C7.66775 18.1886 7.62354 18.9488 7.62354 19.7194C7.62354 30.6102 16.4574 39.4388 27.3546 39.4388C38.2517 39.4388 47.0855 30.6102 47.0855 19.7194C47.0855 18.9439 47.0407 18.1789 46.9536 17.4267L43.826 18.0518ZM44.2613 9.54743L40.9084 10.2176C37.9134 5.95821 32.9593 3.1746 27.3546 3.1746C21.7442 3.1746 16.7856 5.96385 13.7915 10.2305L10.4399 9.56057C13.892 3.83178 20.1756 0 27.3546 0C34.5281 0 40.8075 3.82591 44.2613 9.54743Z"
                                    fill="var(--primary-color)"
                                />
                                <mask id="mask0_1413_1551" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="8" width="54" height="11">
                                    <path d="M27 18.3652C10.5114 19.1944 0 8.88892 0 8.88892C0 8.88892 16.5176 14.5866 27 14.5866C37.4824 14.5866 54 8.88892 54 8.88892C54 8.88892 43.4886 17.5361 27 18.3652Z" fill="var(--primary-color)" />
                                </mask>
                                <g mask="url(#mask0_1413_1551)">
                                    <path
                                        d="M-4.673e-05 8.88887L3.73084 -1.91434L-8.00806 17.0473L-4.673e-05 8.88887ZM27 18.3652L26.4253 6.95109L27 18.3652ZM54 8.88887L61.2673 17.7127L50.2691 -1.91434L54 8.88887ZM-4.673e-05 8.88887C-8.00806 17.0473 -8.00469 17.0505 -8.00132 17.0538C-8.00018 17.055 -7.99675 17.0583 -7.9944 17.0607C-7.98963 17.0653 -7.98474 17.0701 -7.97966 17.075C-7.96949 17.0849 -7.95863 17.0955 -7.94707 17.1066C-7.92401 17.129 -7.89809 17.1539 -7.86944 17.1812C-7.8122 17.236 -7.74377 17.3005 -7.66436 17.3743C-7.50567 17.5218 -7.30269 17.7063 -7.05645 17.9221C-6.56467 18.3532 -5.89662 18.9125 -5.06089 19.5534C-3.39603 20.83 -1.02575 22.4605 1.98012 24.0457C7.97874 27.2091 16.7723 30.3226 27.5746 29.7793L26.4253 6.95109C20.7391 7.23699 16.0326 5.61231 12.6534 3.83024C10.9703 2.94267 9.68222 2.04866 8.86091 1.41888C8.45356 1.10653 8.17155 0.867278 8.0241 0.738027C7.95072 0.673671 7.91178 0.637576 7.90841 0.634492C7.90682 0.63298 7.91419 0.639805 7.93071 0.65557C7.93897 0.663455 7.94952 0.673589 7.96235 0.686039C7.96883 0.692262 7.97582 0.699075 7.98338 0.706471C7.98719 0.710167 7.99113 0.714014 7.99526 0.718014C7.99729 0.720008 8.00047 0.723119 8.00148 0.724116C8.00466 0.727265 8.00796 0.730446 -4.673e-05 8.88887ZM27.5746 29.7793C37.6904 29.2706 45.9416 26.3684 51.6602 23.6054C54.5296 22.2191 56.8064 20.8465 58.4186 19.7784C59.2265 19.2431 59.873 18.7805 60.3494 18.4257C60.5878 18.2482 60.7841 18.0971 60.9374 17.977C61.014 17.9169 61.0799 17.8645 61.1349 17.8203C61.1624 17.7981 61.1872 17.7781 61.2093 17.7602C61.2203 17.7512 61.2307 17.7427 61.2403 17.7348C61.2452 17.7308 61.2499 17.727 61.2544 17.7233C61.2566 17.7215 61.2598 17.7188 61.261 17.7179C61.2642 17.7153 61.2673 17.7127 54 8.88887C46.7326 0.0650536 46.7357 0.0625219 46.7387 0.0600241C46.7397 0.0592345 46.7427 0.0567658 46.7446 0.0551857C46.7485 0.0520238 46.7521 0.0489887 46.7557 0.0460799C46.7628 0.0402623 46.7694 0.0349487 46.7753 0.0301318C46.7871 0.0204986 46.7966 0.0128495 46.8037 0.00712562C46.818 -0.00431848 46.8228 -0.00808311 46.8184 -0.00463784C46.8096 0.00228345 46.764 0.0378652 46.6828 0.0983779C46.5199 0.219675 46.2165 0.439161 45.7812 0.727519C44.9072 1.30663 43.5257 2.14765 41.7061 3.02677C38.0469 4.79468 32.7981 6.63058 26.4253 6.95109L27.5746 29.7793ZM54 8.88887C50.2691 -1.91433 50.27 -1.91467 50.271 -1.91498C50.2712 -1.91506 50.272 -1.91535 50.2724 -1.9155C50.2733 -1.91581 50.274 -1.91602 50.2743 -1.91616C50.2752 -1.91643 50.275 -1.91636 50.2738 -1.91595C50.2714 -1.91515 50.2652 -1.91302 50.2552 -1.9096C50.2351 -1.90276 50.1999 -1.89078 50.1503 -1.874C50.0509 -1.84043 49.8938 -1.78773 49.6844 -1.71863C49.2652 -1.58031 48.6387 -1.377 47.8481 -1.13035C46.2609 -0.635237 44.0427 0.0249875 41.5325 0.6823C36.215 2.07471 30.6736 3.15796 27 3.15796V26.0151C33.8087 26.0151 41.7672 24.2495 47.3292 22.7931C50.2586 22.026 52.825 21.2618 54.6625 20.6886C55.5842 20.4011 56.33 20.1593 56.8551 19.986C57.1178 19.8993 57.3258 19.8296 57.4735 19.7797C57.5474 19.7548 57.6062 19.7348 57.6493 19.72C57.6709 19.7127 57.6885 19.7066 57.7021 19.7019C57.7089 19.6996 57.7147 19.6976 57.7195 19.696C57.7219 19.6952 57.7241 19.6944 57.726 19.6938C57.7269 19.6934 57.7281 19.693 57.7286 19.6929C57.7298 19.6924 57.7309 19.692 54 8.88887ZM27 3.15796C23.3263 3.15796 17.7849 2.07471 12.4674 0.6823C9.95717 0.0249875 7.73904 -0.635237 6.15184 -1.13035C5.36118 -1.377 4.73467 -1.58031 4.3155 -1.71863C4.10609 -1.78773 3.94899 -1.84043 3.84961 -1.874C3.79994 -1.89078 3.76474 -1.90276 3.74471 -1.9096C3.73469 -1.91302 3.72848 -1.91515 3.72613 -1.91595C3.72496 -1.91636 3.72476 -1.91643 3.72554 -1.91616C3.72593 -1.91602 3.72657 -1.91581 3.72745 -1.9155C3.72789 -1.91535 3.72874 -1.91506 3.72896 -1.91498C3.72987 -1.91467 3.73084 -1.91433 -4.673e-05 8.88887C-3.73093 19.692 -3.72983 19.6924 -3.72868 19.6929C-3.72821 19.693 -3.72698 19.6934 -3.72603 19.6938C-3.72415 19.6944 -3.72201 19.6952 -3.71961 19.696C-3.71482 19.6976 -3.70901 19.6996 -3.7022 19.7019C-3.68858 19.7066 -3.67095 19.7127 -3.6494 19.72C-3.60629 19.7348 -3.54745 19.7548 -3.47359 19.7797C-3.32589 19.8296 -3.11788 19.8993 -2.85516 19.986C-2.33008 20.1593 -1.58425 20.4011 -0.662589 20.6886C1.17485 21.2618 3.74125 22.026 6.67073 22.7931C12.2327 24.2495 20.1913 26.0151 27 26.0151V3.15796Z"
                                        fill="var(--primary-color)"
                                    />
                                </g>
                            </svg>
                            <h4 class="font-medium text-3xl text-surface-900 dark:text-surface-0">SAKAI</h4>
                        </a>
                    </div>

                    <div class="col-span-12 md:col-span-10">
                        <div class="grid grid-cols-12 gap-8 text-center md:text-left">
                            <div class="col-span-12 md:col-span-3">
                                <h4 class="font-medium text-2xl leading-normal mb-4 text-surface-900 dark:text-surface-0">Redes Sociais</h4>
                                <a class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100">Instagram</a>
                                <a class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100">Facebook</a>
                                <a class="leading-normal text-xl block cursor-pointer text-surface-700 dark:text-surface-100">WhatsApp</a>
                            </div>

                            <div class="col-span-12 md:col-span-9">
                                <h4 class="font-medium text-2xl leading-normal mb-4 text-surface-900 dark:text-surface-0">Legal</h4>
                                <a class="leading-normal text-xl block cursor-pointer mb-2 text-surface-700 dark:text-surface-100">Politica de Privacidade</a>
                                <a class="leading-normal text-xl block cursor-pointer text-surface-700 dark:text-surface-100">Termos de Serviços</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.feature-card {
    .card-background {
        min-height: 160px;
        height: 100% !important;
        padding: 2px;
        border-radius: 10px;
    }

    .card-content {
        border-radius: 8px;

        .card-icon {
            width: 3.5rem;
            height: 3.5rem;
            border-radius: 10px;
        }
    }
}

.ribbon {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
    overflow: hidden;
    width: 146px;
    height: 141px;
    text-align: center;

    span {
        font-size: 14px;
        font-weight: 700;
        color: #fff;
        line-height: 30px;
        transform: rotate(45deg);
        width: 188px;
        display: block;
        background: var(--primary-color);
        box-shadow: 0 1px 4px 0 rgba(0,0,0,.3);
        position: absolute;
        top: 43px;
        right: -36px;
    }
}
</style>
