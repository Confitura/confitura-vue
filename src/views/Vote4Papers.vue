<template>
    <div class="v4p">
        <Box class="content" color="black" v-if="currentVote" :full="false">
            <div class="v4p-container">
                <div v-if="presentation" class="presentation">
                    <h2 class="presentation__title">{{presentation.title}}</h2>

                    <div class="presentation__speakers">
                        <div class="presentation__speaker speaker" v-for="speaker in presentation.speakers">
                            <img :src="speaker.photo" alt="speaker photo" class="speaker__photo">
                            <div class="speaker__name">
                                <span>{{getFirstNameOf(speaker)}}</span>
                                <span>{{getLastNameOf(speaker)}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="presentation__metadata">
                        <i class="presentation__icon fas fa-flag" title="language"></i>
                        <div class="presentation__language">{{language}}</div>
                        <i class="presentation__icon fas fa-graduation-cap" title="level"></i>
                        <div class="presentation__level">{{presentation.level}}</div>
                        <template v-if="hasTags">
                            <i class="presentation__icon  fas fa-tags" title="tags"></i>
                            <div class="presentation__tags">
                                <span class="presentation__tag" v-for="tag in presentation.tags">{{tag.name}}</span>
                            </div>
                        </template>

                    </div>
                    <div class="presentation__description">{{presentation.shortDescription}}</div>
                </div>
                <div class="vote">
                    <div
                            class="vote-item"
                            v-for="rate in rateValues"
                            :class="[`vote-item--${rate.name}`]"
                            :disabled="currentVote.rate ===rate.rate "
                            @click="doVote(rate.rate)">
                        <span>{{rate.label}}</span>
                    </div>
                </div>
            </div>
        </Box>
        <Box class="content" color="white" v-else="currentVote">
            ALL DONE
            <button @click="startAgain()">start again</button>
        </Box>

    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import TheContact from '@/components/TheContact.vue';
  import Box from '../components/Box.vue';
  import PageHeader from '../components/PageHeader.vue';
  import { LOAD_VOTES, SAVE_VOTE } from '@/store/vote4papers';
  import { Presentation, UserProfile, Vote } from '@/types';
  import VueScrollTo from 'vue-scrollto';
  import axios from 'axios';

  @Component({
    components: { PageHeader, Box, TheContact, VueScrollTo },
  })
  export default class Vote4Papers extends Vue {
    public rateValues = [
      { rate: +1, label: '+1', name: 'positive' },
      { rate: 0, label: '0', name: 'neutral' },
      { rate: -1, label: '-1', name: 'negative' },
    ];
    public presentation: Presentation | null = null;

    private voteIndex = 0;


    get currentVote(): Vote | null {
      if (this.voteIndex < this.votes.length) {
        return this.votes[this.voteIndex];
      } else {
        return null;
      }
    }

    get votes(): Vote[] {
      return this.$store.state.v4p.votes;
    }

    public doVote(rate: number) {
      const vote = this.currentVote;
      if (vote == null) {
        return;
      }
      vote.rate = rate;
      this.$store.dispatch(SAVE_VOTE, { vote })
        .then(() => {
          this.changePage(this.voteIndex + 1);
        });

    }

    public startAgain() {
      this.changePage(0);
    }

    public mounted() {
      const voteIndex = localStorage.getItem('VOTE_INDEX');
      if (voteIndex != null) {
        this.voteIndex = Number(voteIndex);
      }
      this.$store.dispatch(LOAD_VOTES)
        .then(() => this.loadPresentationFor(this.currentVote));
    }

    get hasTags(): boolean | null {
      return this.presentation && this.presentation.tags.length > 0;
    }

    get language(): string {
      let language = 'polish';
      if (this.presentation && this.presentation.language === 'en') {
        language = 'english';
      }
      return language;
    }

    public getFirstNameOf(speaker: UserProfile): string {
      const name = speaker.name || '';
      const idx = name.indexOf(' ');
      return name.substring(0, idx);
    }

    public getLastNameOf(speaker: UserProfile): string {
      const name = speaker.name || '';
      const idx = name.indexOf(' ');
      return name.substring(idx);
    }

    private changePage(pageNumber: number): void {
      this.voteIndex = pageNumber;
      localStorage.setItem('VOTE_INDEX', `${pageNumber}`);
      this.loadPresentationFor(this.currentVote);
    }

    private loadPresentationFor(vote: Vote | null) {
      if (vote == null) {
        this.presentation = null;
      } else {
        axios
          .get<Presentation>(`/api/votes/${vote.id}/presentation`, {
            params: { projection: 'inlineSpeaker' },
          })
          .then((it) => this.presentation = it.data);
      }
    }
  }
</script>

<style lang="scss" scoped>
    @import "../assets/colors";
    @import "../assets/sizes";
    @import "../assets/media";
    @import "../assets/fonts";

    .v4p-container {
        display: flex;
        justify-content: center;
        background-color: black;
        color: #ffffff;

    }

    .vote {
        display: flex;
        flex-direction: column;
    }

    .vote-item {
        width: 60px;
        height: 60px;
        background-color: #ffffff;
        color: #000000;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        font-size: 1.5rem;
        margin: 1px;
        cursor: pointer;

        &:hover {
            background-color: $brand;
            color: #ffffff;

        }

        &--positive {
            border-radius: 30px 30px 0 0;
        }

        &--negative {
            border-radius: 0 0 30px 30px;
        }

    }

    .presentation {
        width: 840px;

        &__title {
            color: $brand;
            font-size: 3rem;
        }

        &__metadata {
            display: flex;
            font-size: 1.5rem;
            margin-bottom: 2rem;
        }

        &__icon {
            margin-right: 1rem;
        }

        &__language, &__level {
            margin-right: 1rem;
        }
        &__tag {
            &:not(:last-child)::after {
                content: ', ';
            }
        }

        &__speakers {
            margin-bottom: 3rem;
            display: flex;
        }

        &__description {
            font-size: 1.2rem;
        }
    }

    .speaker {
        display: flex;
        justify-items: center;
        align-items: center;
        margin-right: 3rem;

        &__photo {
            flex-grow: 0;
            width: 85px;
            height: 85px;
            object-fit: cover;
            border-radius: 85px;
            border: 5px solid #979797;
            margin-right: 1rem;
            background-color: $brand;

        }

        &__name {
            display: flex;
            flex-direction: column;
            color: $brand;
            font-size: 1.5rem;
            font-weight: bold;
        }
    }
</style>
