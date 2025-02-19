<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { useUtils } from '@/composables/utils'
import type { DrawType, TypeNumber, Mode, ErrorCorrectionLevel, DotType, CornerDotType, CornerSquareType } from 'qr-code-styling'
import QRCodeStyling from 'qr-code-styling'
import html2canvas from 'html2canvas'

const { menuURL, menuSimpleURL } = useUtils()
const loading = ref(false)
const __qrCode = ref()
const qrCodeInstance = ref<QRCodeStyling | null>(null)
const options = ref({
    width: 720,
    height: 720,
    type: 'svg' as DrawType,
    data: menuURL,
    margin: 20,
    qrOptions: {
        typeNumber: 0 as TypeNumber,
        mode: 'Byte' as Mode,
        errorCorrectionLevel: 'Q' as ErrorCorrectionLevel
    },
    imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 20,
        crossOrigin: 'anonymous'
    },
    dotsOptions: {
        // color: '#41b583',
        type: 'rounded' as DotType
    },
    backgroundOptions: {
        // color: '#ffffff'
    },
    cornersSquareOptions: {
        // color: '#35495E',
        type: 'extra-rounded' as CornerSquareType
    },
    cornersDotOptions: {
        // color: '#35495E',
        type: 'dot' as CornerDotType
    }
})

onMounted(() => {
    qrCodeInstance.value = new QRCodeStyling(options.value)
    if (__qrCode.value) {
        qrCodeInstance.value.append(__qrCode.value)
    }
})

watch(
    () => options.value.data,
    (newData) => {
        if (qrCodeInstance.value) {
            qrCodeInstance.value.update(options.value)
        }
    }
)

const download = () => {
    if (qrCodeInstance.value) {
        qrCodeInstance.value.download({ extension: 'png' })
    }
}

const downloadDivAsImage = (elementId: string) => {
    loading.value = true
    const element = document.getElementById(elementId)

    html2canvas(element, {
        scale: window.innerWidth < 400 ? 4 : 2
    }).then(function (canvas) {
        const imageUrl = canvas.toDataURL('image/png')
        const link = document.createElement('a')

        link.href = imageUrl
        link.download = 'qrCode.png'
        link.click()
        loading.value = false
    })
}
</script>

<template>
    <div class="card">
        <Toolbar class="mb-6">
            <template #start>
                <Button @click="download" class="mr-2" icon="pi pi-download" :label="$t('QR_CODE.DOWNLOAD.SIMPLE')"/>
                <Button id="code" @click="downloadDivAsImage('qr-code-card')" :loading icon="pi pi-download" :label="$t('QR_CODE.DOWNLOAD.STYLED')"/>
            </template>
        </Toolbar>
        <div id="qr-code-card" class="qr-card bg-black p-4 rounded-xl">
            <div id="qr-code" ref="__qrCode"/>
            <h1 class="title pt-2 pb-6 text-white text-center text-mono">{{ $t('QR_CODE.CARD.MENU') }}</h1>
            <p class="help text-white text-center text-mono">{{ $t('QR_CODE.CARD.INFO') }}</p>
            <p class="link pt-4 pb-6 text-white text-center text-4xl text-mono">{{ menuSimpleURL }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#qr-code-card {
    max-width: 512px;
    height: auto;
    #qr-code {
        :deep(svg) {
            height: 100%;
            width: 100%;
            border-radius: 1rem;
        }
    }

    .title {
        font-size: clamp(2.5rem, 15vw, 6rem);
    }

    .help {
        font-size: clamp(10px, 5.5vw, 1.6rem);
    }

    .link {
        font-size: clamp(10px, 5.5vw, 2.25rem);
    }
}
</style>
