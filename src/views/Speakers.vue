<template>
    <div class="speakers">
        <PageHeader title="Speakers"/>
        <Box class="content" color="white">
            <div class="speakers__grid">
                {{speakers}}
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

    .faq {
        overflow: hidden;
    }

    .content {
        .foreword {
            text-align: left;
            color: #000000;
            font-size: 1.5rem;
            @include md() {
                width: 50%;
            }

            &__link {
                color: $brand;
            }
        }


    }
</style>
<style lang="scss">
    @import "../assets/colors";
    @import "../assets/sizes";
    @import "../assets/media";
    @import "../assets/fonts";

    .questions section {
        display: grid;
        text-align: left;
        grid-template-columns: 1fr;
        @include md() {
            grid-template-columns: 1fr 1fr;
        }

        h2 {
            font-size: 2.2rem;
            color: $brand;
            @include md() {
                grid-column: 1 / 2;
                &, + h3 {
                    margin-top: 4rem;
                    margin-bottom: 1rem;
                }
            }


        }

        h3 {
            font-size: 1.5rem;
            font-weight: bold;
            align-self: center;
            margin: 0 0 1rem;
            @include md() {
                grid-column: 2 / 3;
            }
        }

        p, ul {
            font-size: 1.5rem;
            margin: 0;
            @include md() {
                grid-column: 2 / 3;
            }

            + h3 {
                margin-top: 2em;
            }
        }

    }
</style>
