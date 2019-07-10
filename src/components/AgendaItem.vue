<template>
    <div class="agendaItem" :class="{'agendaItem--withPresentation': entry.presentationId}" :key="rates">
        <div v-if="entry.roomLabel" class="agendaItem__room">{{entry.roomLabel}}</div>
        <div class="agendaItem__presentation" v-if="entry.presentationId" @click="select(entry.presentation)">
            <div class="agendaItem__title">{{entry.presentation.title}}</div>
            <div class="agendaItem__speakers">
                <span class="agendaItem__speaker" v-for="speaker in entry.speaker">{{speaker.name}}</span>
            </div>
            <PresentationMetadata
                    :presentation="entry.presentation"
                    :showTags="false"
                    class="agendaItem__metadata"></PresentationMetadata>
            <div class="agendaItem__separator"></div>
            <div class="agendaItem__rate" @click.stop="">
                <template v-if="!loggedIn">
                    <router-link to="login">Sign in</router-link>
                    to rate.
                </template>
                <template v-else-if="isRated(entry.presentation)">
                    already rated!
                </template>
                <template v-else>rate it!
                    <div :key="rate">
                        <star-rating
                                @rating-selected="startRating(entry.presentation)"
                                v-model="rate"
                                :star-size="30"
                                :show-rating="false"
                                :rounded-corners="true"
                                :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
                    </div>
                </template>

            </div>

        </div>
        <div v-else class="agendaItem__label">
            {{entry.label}}
        </div>
    </div>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
  import { AgendaEntry } from '@/views/Agenda.vue';
  import PresentationMetadata from '@/components/PresentationMetadata.vue';
  import PresentationModal from '@/components/PresentationModal.vue';
  import { Presentation, PresentationRate, WithTitle } from '@/types';
  import StarRating from 'vue-star-rating';

  @Component({
    components: { PresentationModal, PresentationMetadata, StarRating },
  })
  export default class AgendaItem extends Vue {
    @Prop({ required: true })
    public entry!: AgendaEntry;
    public rate: number = 0;


    @Emit()
    public select(presentation: Presentation) {
      return presentation;
    }

    @Emit()
    public startRating(presentation: WithTitle): PresentationRate {
      const rate = { presentation, rate: this.rate };
      this.rate = 0;
      return rate;
    }

    public isRated(presentation: Presentation): boolean {
      return this.$store.getters.isRated(presentation.id);
    }

    public get rates() {
      return this.$store.state.presentations.rates;
    }

    public get loggedIn() {
      return this.$store.getters.isLogin;
    }


  }
</script>

<style scoped lang="scss">
    @import "../assets/sizes";
    @import "../assets/media";
    @import "../assets/colors";

    .agendaItem {
        font-size: 1rem;
        padding: .7rem;
        display: flex;
        flex-direction: column;

        &--withPresentation {
            cursor: pointer;

            &:hover {
                background-color: #DFDFDF;
            }
        }

        @include md() {
            padding: 1.5rem;
        }

        &__room {
            color: $brand;
            font-size: .8rem;
            margin-bottom: .5rem;
            @include md() {
                display: none;
            }
        }

        &__entry--all, &__label {
            color: $brand;
            font-weight: bold;
            font-size: 1.2rem;
            text-transform: capitalize;
        }

        &__label {
            justify-self: center;
        }

    }

    .agendaItem__presentation {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .agendaItem__speakers {
        font-size: 1rem;
        color: #767676;
        margin-top: 1rem;
    }

    .agendaItem__speaker {

        &:not(:last-child):after {
            content: ', ';
        }
    }

    .agendaItem__metadata {
        font-size: 1rem;
        line-height: 1.2rem;
        margin-top: 0.3rem;
    }

    .agendaItem__separator {
        flex-grow: 1;
    }
</style>
