<template>
    <div class="container">
        <img :src="thumbnailSrc"
             ref="image"
             class="image thumbnail">
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component({
        components: {},
    })
    export default class LazyImage extends Vue {
        @Prop(String)
        public src!: string;

        public $refs!: Vue['$refs'] & {
            image: HTMLImageElement,
        };

        public mounted(): void {
            const fullImage = new Image();
            fullImage.src = this.fullSizeSrc;
            fullImage.onload = () => {
                const image = this.$refs.image;
                image.src = fullImage.src;
                setTimeout(() => image.classList.remove('thumbnail'));
            };
        }

        public get fullSizeSrc(): string {
            return this.resizeTo(300);
        }

        public get thumbnailSrc(): string {
            return this.resizeTo(5);
        }

        private resizeTo(size: number) {
            if (this.src.includes('/photos/')) {
                return this.src.replace('/photos/', `/photos/${size}/`);
            } else if (this.src.includes('githubusercontent.com')) {
                return `${this.src}&s=${size}`;
            } else if (this.src.includes('gravatar.com')) {
                return `${this.src}&s=${size}`;
            } else {
                return this.src;
            }
        }
    }
</script>

<style scoped lang="scss">
    .container {
        overflow: hidden;
        width: 100%;
        height: 100%;
    }

    .image {
        width: 100%;
        height: 100%;
        filter: blur(0);
        transition: 0.5s filter linear;
        will-change: filter;
    }

    .thumbnail {
        filter: blur(10px);
    }
</style>
