<template>
    <div class="v4p">
        <PageHeader class="header" title="Vote for papers">
        </PageHeader>
        <Box class="content" color="white" v-if="currentVote">
            <div v-if="presentation">
                <h5>title:</h5>
                <h3>{{presentation.title}}</h3>
                <h5>language:</h5>
                <span>{{presentation.language}}</span>
                <h5>level:</h5>
                <span>{{presentation.level}}</span>
                <h5>speakers:</h5>
                <div v-for="s of presentation.speakers">
                    {{s.name}}
                    <h5>Bio</h5>
                    {{s.bio}}
                </div>
                <h5>tags:</h5>
                <div v-for="tag of presentation.tags">{{tag.name}}</div>
                <h5>shortDescription:</h5>
                <div>{{presentation.shortDescription}}</div>
                <h5>description:</h5>
                <div>{{presentation.description}}</div>
            </div>
            <button :disabled="currentVote.rate ===rate.rate " @click="vote(rate.rate)" v-for="rate of rateValues">
                {{rate.label}}
            </button>
        </Box>
        <Box class="content" color="white" v-else="currentVote">
            ALL DONE
            <button @click="startAgain()">start again</button>
        </Box>

        <TheContact id="contact"/>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import TheContact from '@/components/TheContact.vue';
  import Box from "../components/Box.vue";
  import PageHeader from "../components/PageHeader.vue";
  import { LOAD_VOTES, SAVE_VOTE } from "@/store/vote4papers";
  import { Vote, Presentation } from "@/types";
  import VueScrollTo from 'vue-scrollto';
  import axios from 'axios';

  @Component({
    components: { PageHeader, Box, TheContact, VueScrollTo },
  })
  export default class Vote4Papers extends Vue {

    private voteIndex = 0;

    public rateValues = [
      { rate: -1, label: '-1' },
      { rate: 0, label: '0' },
      { rate: +1, label: '+1' }
    ];
    public presentation: Presentation | null = null;

    get currentVote(): Vote | null {
      if (this.voteIndex < this.votes.length) {
        return this.votes[this.voteIndex]
      } else {
        return null;
      }
    }

    get votes(): Vote[] {
      return this.$store.state.v4p.votes
    }

    private mounted() {
      let voteIndex = localStorage.getItem("VOTE_INDEX");
      if (voteIndex != null) {
        this.voteIndex = Number(voteIndex)
      }
      this.$store.dispatch(LOAD_VOTES)
        .then(it => this.loadPresentationFor(this.currentVote));

    }

    loadPresentationFor(vote: Vote | null) {
      if (vote == null) {
        this.presentation = null;
      } else {
        axios
          .get<Presentation>(`/api/votes/${vote.id}/presentation`, {
            params: { projection: 'inlineSpeaker' }
          })
          .then(it => this.presentation = it.data);
      }
    }

    vote(rate: number) {
      let vote = this.currentVote;
      if (vote == null) {
        return
      }
      vote.rate = rate;
      this.$store.dispatch(SAVE_VOTE, { vote: vote })
        .then(it => {
          this.changePage(this.voteIndex + 1);
        });

    }

    startAgain() {
      this.changePage(0)
    }

    private changePage(number: number) {
      this.voteIndex = number;
      localStorage.setItem("VOTE_INDEX", String(number));
      this.loadPresentationFor(this.currentVote)
    }
  }
</script>

<style lang="scss">
</style>
