<template>
    <div class="participant">
        <PageHeader :small="true" title="See you on Saturday!"></PageHeader>
        <Box :full="false" class="content " color="white">
            <div v-if="participant">
                <p>
                    You are all setup to come to conference!
                    Create account and you will be able to create personal agenda and also rate presentation after
                    seeing them :)
                </p>
                <p>
                    Here is your ticket. Show it at the registration desk and enjoy the conference!
                    <img :src="qrcode" alt="b0999fbb-408c-4442-93fb-5b81e8a3265a"
                         v-if="qrcode"/>
                </p>
                <p>
                    You will also recieve the ticket via email so don't worry if you loose this address :)
                </p>
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
  import { Participant } from '@/types';

  @Component({
    components: { PageHeader, Box, TheContact },
  })
  export default class ParticipantPage extends Vue {

    public participant: Participant | null = null;
    public qrcode: string = "";

    public mounted() {
      const { id } = this.$route.params;
      axios.get<Participant>(`/api/participants/${id}`)
        .then(it => {
          this.participant = it.data;
          this.qrcode = `/api/participants/${this.participant.id}/ticket`;
        })
    }
  }

</script>

<style lang="scss" scoped>


</style>
