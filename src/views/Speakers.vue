<template>
    <div class="speakers">
        <PageHeader title="Speakers"/>
        <Box class="content no-padding" color="white">
            <div class="speakers__grid">
                <div class="speakers__speaker speaker" v-for="speaker in speakers">
                    <!--                    <div class="speaker__photo">-->
                    <img :src="speaker.photo" alt="" class="speaker__photo">
                    <!--                    </div>-->
                    <div class="speaker__name">
                        <span>{{speaker.name | firstName}}</span>
                        <span>{{speaker.name | lastName}}</span>

                    </div>
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
  import { LOAD_SPEAKERS } from '@/store/admin';

  @Component({
    components: { PageHeader, Box, TheContact },
  })
  export default class Speakers extends Vue {
    public mounted() {
      this.$store.dispatch(LOAD_SPEAKERS);
    }

    public get speakers() {
      return this.$store.state.admin.speakers;
    }
  }

</script>

<style lang="scss" scoped>
    @import "../assets/colors";
    @import "../assets/sizes";
    @import "../assets/media";
    @import "../assets/fonts";

    .speakers {
        overflow: hidden;

        &__grid {
            display: flex;
            flex-direction: column;
        }
    }

    .speaker {
        display: flex;

        &:nth-child(odd) {
            flex-direction: row-reverse;

            .speaker__name {
                align-items: flex-end;
            }

        }
    }

    .speaker__photo {
        width: 50vw;
        height: 50vw;
        object-fit: cover;
    }

    .speaker__name {
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-family: $font-bold;
        font-size: 1.7rem;
        padding: 1rem;
    }


</style>

