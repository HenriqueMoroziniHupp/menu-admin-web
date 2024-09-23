<script setup lang="ts">
import { IProduct } from '@/interfaces/IProduct';
import { ref } from 'vue';

const { product } = defineProps<{ product: IProduct }>()

const loading = ref(true)
const parallax = ref()

function onImageLoad() {
    loading.value = false;
}

function formatPrice(price: any) {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'BRL' }).format(price)
}

function hasPrice(product: IProduct) {
    return product.priceSingle
        || product.priceSmall
        || product.priceMedium
        || product.priceLarge
}
</script>

<template>
    <Card class="card-product">
        <template #header>
            <div class="image-wrapper parallax-image absolute ">
                <DeferredContent>
                    <img
                        class="select-none block m-auto aspect-video w-full object-cover"
                        alt="user header"
                        :src="product.imageUrl"
                        draggable="false"
                        @load="onImageLoad"
                    />
                </DeferredContent>
                <p class="title text-xl">{{ product.name }} </p>
                <Transition>
                    <div class="image-loading" v-if="loading"></div>
                </Transition>
            </div>
        </template>
        <template #subtitle v-if="product.description">{{ product.description }}
        </template>
        <template #content>
            <template v-if="hasPrice(product)">
                <Badge v-if="product.priceSingle" :value="`Tamanho Unico: ${formatPrice(product.priceSingle)}`"></Badge>
                <div v-else class="flex flex-wrap gap-2">
                    <Badge v-if="product.priceSingle" :value="`Pequeno:  ${formatPrice(product.priceSingle)}`"></Badge>
                    <Badge v-if="product.priceMedium" :value="`Medio:  ${formatPrice(product.priceMedium)}`"></Badge>
                    <Badge v-if="product.priceLarge" :value="`Grande:  ${formatPrice(product.priceLarge)}`"></Badge>
                </div>
            </template>
            <template v-else>
                <Badge value="Consultar preço"></Badge>
            </template>
        </template>
    </Card>
</template>

<style lang="scss" scoped>
.p-card {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
}

.card-product {
  overflow: hidden;
  display: flex;
  flex-grow: 1;
  flex-basis: 22rem;
}

.image-wrapper {
    position: relative;
    overflow: hidden;

    .title {
        position: absolute;
        width: 100%;
        bottom: 0;
        color: white;
        padding: 0.6rem 1rem;
        z-index: 1;
    }
}

.image-wrapper::after {
    content: "";
    position: absolute;
    z-index: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 8rem;
    background-image: linear-gradient(180deg,transparent 50%,rgba(0,0,0,.6));
}

.image-loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255,255,255,.6);
  border-radius: inherit;
}

.image-loading::before {
  content: '';
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 5px solid #514b82;
  animation:
    l20-1 0.8s infinite linear alternate,
    l20-2 1.6s infinite linear;
}

@keyframes l20-1{
   0%    {clip-path: polygon(50% 50%,0       0,  50%   0%,  50%    0%, 50%    0%, 50%    0%, 50%    0% )}
   12.5% {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100%   0%, 100%   0%, 100%   0% )}
   25%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 100% 100%, 100% 100% )}
   50%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
   62.5% {clip-path: polygon(50% 50%,100%    0, 100%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
   75%   {clip-path: polygon(50% 50%,100% 100%, 100% 100%,  100% 100%, 100% 100%, 50%  100%, 0%   100% )}
   100%  {clip-path: polygon(50% 50%,50%  100%,  50% 100%,   50% 100%,  50% 100%, 50%  100%, 0%   100% )}
}

@keyframes l20-2{
  0%    {transform:scaleY(1)  rotate(0deg)}
  49.99%{transform:scaleY(1)  rotate(135deg)}
  50%   {transform:scaleY(-1) rotate(0deg)}
  100%  {transform:scaleY(-1) rotate(-135deg)}
}
</style>
