<template>
    <a :href="url" v-if="id" target="_blank" rel="noopener" class="link">
        <i class="fab" :class="icon"></i>
    </a>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class SocialLink extends Vue {
    @Prop({ required: true })
    public type!: 'twitter';

    @Prop({ required: true })
    public id!: string;

    public social = {
      twitter: {
        icon: 'fa-twitter-square',
        url: 'https://twitter.com/',
      },
      facebook: {
        icon: 'fa-facebook-square',
        url: 'https://www.facebook.com/',
      },
      github: {
        icon: 'fa-github-square',
        url: 'https://www.github.com/',
      },
    };

    get icon(): string {
      return this.social[this.type].icon;
    }

    get url(): string {
      return this.social[this.type].url+this.id;
    }
  }
</script>

<style scoped lang="scss">
    @import "../assets/colors";

    .link {
        color: #000000;
        &:hover{
            color: $brand;
        }
    }

</style>
