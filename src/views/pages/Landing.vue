<script setup>
import { event } from 'vue-gtag';

const smoothScroll = (id) => {
    document.body.click();
    document.querySelector(id).scrollIntoView({
        behavior: 'smooth'
    });

    if(id === '#pricing') {
        event('scrollToPricing', {
            event_category: 'landing',
            event_label: 'scrollToPricing'
        });
    }
};

const openWhatsApp = (plan) => {
    const phone = '5527999814663';
    let message = '';

    switch(plan) {
        case 'parceria':
            message = 'Olá! Gostaria de saber mais sobre parceria com o Cardápio UpZini 🍽';
            break;
        case 'mensal':
            message = 'Olá! Gostaria de contratar o plano mensal do Cardápio UpZini 🍽';
            break;
        case 'anual':
            message = 'Olá! Gostaria de contratar o plano anual do Cardápio UpZini 🍽';
            break;
    }

    event('openWhatsApp', {
        event_category: 'landing',
        event_label: plan
    });

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
};

const openDemo = () => {
    event('openDemo', {
        event_category: 'landing',
        event_label: 'openDemo'
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
                    <h2 class="font-normal text-xl md:text-2xl leading-normal pt-2 md:mt-4 text-gray-700">Uma nova experiência. Destaque seus pratos com belas imagens e impulsione seu negócio</h2>
                    <Button @click="smoothScroll('#pricing')" label="Quero Contratar" rounded class="!text-lg md:!text-xl mt-8 !px-4"></Button>
                    <Button @click="openDemo" label="Ver Demonstração" as="a" href="https://pioneiro.upzini.com" target="_blank" rel="noopener" rounded class="!text-lg md:!text-xl mt-8 ml-4 !px-4"></Button>
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
                                <Button @click="openWhatsApp('parceria')" label="Entrar em Contato" class="p-button-rounded border-0 mt-4 font-light leading-tight bg-blue-500 text-white"></Button>
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
                                    <span class="text-5xl font-bold mr-2 text-surface-900 dark:text-surface-0">R$40</span>
                                    <span class="text-surface-600 dark:text-surface-200">por mês</span>
                                </div>
                                <Button @click="openWhatsApp('mensal')" label="Quero Contratar" class="p-button-rounded border-0 mt-4 font-light leading-tight bg-blue-500 text-white"></Button>
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
                                    <span class="text-5xl font-bold mr-2 text-surface-900 dark:text-surface-0">R$400</span>
                                    <span class="text-surface-600 dark:text-surface-200">por ano</span>
                                </div>
                                <Button @click="openWhatsApp('anual')" label="Quero Contratar" class="p-button-rounded border-0 mt-4 font-light leading-tight bg-blue-500 text-white"></Button>
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
                            <Image src="/pwa-192x192.png" alt="Logo" width="50" height="54" class="mr-2"/>
                            <h4 class="font-medium text-3xl text-surface-900 dark:text-surface-0">UPZINI</h4>
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
