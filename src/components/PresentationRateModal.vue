<template>
    <Modal v-if="underRating" @close="close()">
        <div class="ratingModal__body">
            <h2>{{this.presentation.title}}</h2>
            <star-rating
                    v-model="rate"
                    star-size="30"
                    :show-rating="false"
                    :rounded-corners="true"
                    :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
            <md-field style="flex-grow: 1">
                <label>comment</label>
                <md-textarea v-model="autogrow"></md-textarea>
            </md-field>
        </div>
    </Modal>
</template>

<script lang="ts">
  import { Component, Emit, Vue, Watch } from 'vue-property-decorator';
  import { PresentationRate, WithTitle } from '@/types';
  import Modal from '@/components/Modal.vue';
  import { SET_PRESENTATION_UNDER_RATE } from '@/store/presentations';
  import StarRating from 'vue-star-rating';


  @Component({
    components: { Modal, StarRating },
  })
  export default class PresentationRateModal extends Vue {
    public rate: number = 0;
    public presentation: WithTitle | null = null;
    public underRating = this.$store.state.presentations.underRating;


    public mounted() {
      console.log('123 ', this.underRating);
      const underRating = this.underRating;
      this.rate = underRating.rate;
      this.presentation = underRating.presentation;
    }

    @Emit()
    public close() {
      this.$store.commit(SET_PRESENTATION_UNDER_RATE, { rate: 0, presentation: null });
      return true;
    }

    @Watch('underRating')
    private changed(newValue: PresentationRate) {
      if (newValue.presentation) {
        this.presentation = newValue.presentation;
        this.rate = newValue.rate;
      }
    }


  }
</script>

<style scoped lang="scss">
    .ratingModal__body {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }
</style>
