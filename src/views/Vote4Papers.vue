<template>
    <div class="v4p">
        <PageHeader class="header" title="Vote for papers">
        </PageHeader>
        <Box class="content" color="white">
        </Box>
        <TheContact id="contact"/>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import TheContact from '@/components/TheContact.vue';
  import Box from "../components/Box.vue";
  import PageHeader from "../components/PageHeader.vue";
  import { LOAD_VOTES } from "@/store/vote4papers";


  @Component({
    components: { PageHeader, Box, TheContact },
  })
  export default class Vote4Papers extends Vue {

    private mounted() {
      this.$store.dispatch(LOAD_VOTES);
    }

  }
</script>

<style lang="scss">
</style>
