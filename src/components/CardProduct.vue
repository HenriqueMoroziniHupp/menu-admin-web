<script setup lang="ts">
import { IProduct } from '@/interfaces/IProduct';
import { ref } from 'vue';

const { product } = defineProps<{ product: IProduct }>()

const loading = ref(true)
const parallax = ref()

function onImageLoad() {
    loading.value = false;
}
</script>

<template>
    <Card class="card-product">
        <template #header>
            <div class="image-wrapper parallax-image">
                <img
                    class=" select-none block m-auto rounded-borde aspect-video w-full object-cover"
                    alt="user header"
                    :src="product.imageUrl"
                    draggable="false"
                    @load="onImageLoad"
                />
                <Transition>
                    <div class="image-loading" v-if="loading"></div>
                </Transition>
            </div>
        </template>
        <template #title >{{ product.name }}</template>
        <template #subtitle>{{ product.description }}</template>
        <!-- <template #content>
            <p class="m-0">
                {{ product.description }}
            </p>
        </template> -->
        <!-- <template #footer>
            <div class="flex gap-4 mt-1">
                <Button @click="loading = !loading" label="Cancel" severity="secondary" outlined class="w-full" />
            </div>
        </template> -->
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
