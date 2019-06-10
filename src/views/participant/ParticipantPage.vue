<template>
    <div class="participant">
        <PageHeader  title="Registration" type="peace"></PageHeader>
        <Box :full="false" color="white">
            <div v-if="participant" class="confirmation">
                <h2 class="header">Success!</h2>
                <div class="message">
                    <p>
                        Congrats {{participant.firstName}} {{participant.lastName}} !!! <br/>
                        You are all setup to come to Confitura 2019!
                    </p>
                    <p>Please consider create an account and you will be able to create personal agenda and also rate presentation during the conference.
                    Click <router-link to="/login">here</router-link> to do so.</p>
                    <p>
                        Here is your ticket. Show it at the registration desk and enjoy the conference!
                        <img :src="qrcode" alt="b0999fbb-408c-4442-93fb-5b81e8a3265a"
                             v-if="qrcode"/>
                    </p>
                    <p>
                        You will also receive it on your email address so don't worry if you loose this address :)
                    </p></div>
            </div>
        </Box>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Box from '@/components/Box.vue';
  import TheContact from '@/components/TheContact.vue';
  import axios from 'axios';
  import PageHeader from '@/components/PageHeader.vue';
  import { Participant, PARTICIPATION_ID } from '@/types';

  @Component({
    components: { PageHeader, Box, TheContact },
  })
  export default class ParticipantPage extends Vue {

    public participant: Participant | null = null;
    public qrcode: string = '';

    public mounted() {
      const { id } = this.$route.params;
      axios.get<Participant>(`/api/participants/${id}`)
        .then((it) => {
          localStorage.setItem(PARTICIPATION_ID, id);
          this.participant = it.data;
          this.qrcode = `/api/participants/${this.participant.id}/ticket`;
        });
    }
  }
</script>

<style lang="scss" scoped>
    @import "../../assets/colors";
    @import "../../assets/sizes";
    @import "../../assets/media";
    @import "../../assets/fonts";
    .confirmation {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        @include md(){
            flex-direction: row;
        }
    }

    .header {
        color: $brand;
        font-size: 3rem;
        font-weight: bold;
        flex-basis: 30%;
        margin-right: 3rem;
    }

    .message {
        flex-basis: 50%;
        font-size: 1.3rem;
        line-height: 1.5rem;


    }

</style>
