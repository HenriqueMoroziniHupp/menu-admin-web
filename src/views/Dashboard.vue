<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ProductService } from '@/service/ProductService';
import { onMounted, ref, watch } from 'vue';

const { getPrimary, getSurface, isDarkTheme } = useLayout();

const products = ref(null);
const chartData = ref(null);
const chartOptions = ref(null);


onMounted(() => {
    ProductService.getProductsSmall().then((data) => (products.value = data));
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

function setChartData() {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [
            {
                type: 'bar',
                label: 'Acessos',
                backgroundColor: documentStyle.getPropertyValue('--p-primary-400'),
                data: [250, 200, 150, 300],
                barThickness: 32
            },
        ]
    };
}

function setChartOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const borderColor = documentStyle.getPropertyValue('--surface-border');
    const textMutedColor = documentStyle.getPropertyValue('--text-color-secondary');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: textMutedColor
                },
                grid: {
                    color: 'transparent',
                    borderColor: 'transparent'
                }
            },
            y: {
                stacked: true,
                ticks: {
                    color: textMutedColor
                },
                grid: {
                    color: borderColor,
                    borderColor: 'transparent',
                    drawTicks: false
                }
            }
        }
    };
}

watch([getPrimary, getSurface, isDarkTheme], () => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});
</script>

<template>
    <div class="grid grid-cols-12 gap-8">
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mx-0">
                <div class="flex justify-between mb-4 mx-4 lg:mx-0">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">{{ $t('DASHBOARD.PRODUCTS') }}</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">15</div>
                    </div>
                    <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-list text-blue-500 !text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mx-0">
                <div class="flex justify-between mb-4 mx-4 lg:mx-0">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">{{ $t('DASHBOARD.CATEGORIES') }}</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">8</div>
                    </div>
                    <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-clone text-orange-500 !text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mx-0">
                <div class="flex justify-between mb-4 mx-4 lg:mx-0">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">{{ $t('DASHBOARD.CLIENTS') }}</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">44</div>
                    </div>
                    <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-users text-cyan-500 !text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mx-0">
                <div class="flex justify-between mb-4 mx-4 lg:mx-0">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">{{ $t('DASHBOARD.ACCESS') }}</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">452</div>
                    </div>
                    <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-globe text-purple-500 !text-xl"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-span-12 xl:col-span-6">
            <div class="card">
                <div class=" mx-4 lg:mx-0">
                    <div class="font-semibold text-xl mb-4">{{ $t('DASHBOARD.CHART.TITLE') }}</div>
                    <Chart type="bar" :data="chartData" :options="chartOptions" class="h-80" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.iframe-zoom {
    transform: scale(0.8);
    transform-origin: top left;
    width: 125%;
    height: 125%;
}
</style>
