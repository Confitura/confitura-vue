<template>
    <div class="speaker">
        <PageHeader title="Speakers"/>
        <Box class="content" color="white">
            <div v-if="speaker">
                <img :src="speaker.photo" class="speaker__photo">
                <div class="speaker__social">
                    <SocialLink class="speaker__social-link" type="twitter" :id="speaker.twitter"></SocialLink>
                    <SocialLink type="facebook" :id="speaker.facebook"></SocialLink>
                    <SocialLink type="github" :id="speaker.github"></SocialLink>
                </div>
                <div class="speaker__name">{{speaker.name}}</div>
                <div class="speaker__bio">
                    {{speaker.bio}}
                </div>
            </div>
        </Box>
        <TheContact id="contact"/>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Box from '@/components/Box.vue';
  import PageHeader from '@/components/PageHeader.vue';
  import TheContact from '@/components/TheContact.vue';
  import { LOAD_SPEAKER } from '@/store/admin';
  import SocialLink from '@/components/SocialLink.vue';

  @Component({
    components: { PageHeader, Box, TheContact, SocialLink },
  })
  export default class Speaker extends Vue {
    public mounted() {
      const { id } = this.$route.params;
      this.$store.dispatch(LOAD_SPEAKER, { id });
    }

    public get speaker() {
      return this.$store.state.admin.speaker;
    }
  }

</script>

<style lang="scss" scoped>
    @import "../assets/colors";
    @import "../assets/sizes";
    @import "../assets/media";
    @import "../assets/fonts";

    .speaker {
        overflow: hidden;
    }

    .speaker__photo {
        width: calc(100vw - 50px);
        height: calc(100vw - 50px);
        object-fit: cover;
        box-sizing: border-box;
        @include md() {
            width: 200px;
            height: 200px;
        }
    }

    .speaker__name {
        font-family: $font-bold;
        font-size: 2rem;
        color: $brand;
        margin-top: 2rem;

    }

    .speaker__bio {
        font-size: 1.2rem;
        line-height: 1.7rem;
        margin-top: 2rem;
    }

    .speaker__social {
        margin-top: 2rem;
        font-size: 3rem;

        &-link {
            margin-right: 2rem;
        }
    }


</style>

