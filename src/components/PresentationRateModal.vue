<template>
    <Modal v-if="presentationRate" @close="close()">
        <div class="ratingModal__body">
            <h2 class="ratingModal__title">{{this.presentation.title}}</h2>
            <star-rating
                    v-model="rate"
                    :star-size="30"
                    :show-rating="false"
                    :rounded-corners="true"
                    :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
            <md-field>
                <label>comment</label>
                <md-textarea v-model="comment"></md-textarea>
            </md-field>

            <div>
                <md-button class="md-raised" @click="save()">Send my feedback</md-button>
            </div>
        </div>
    </Modal>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';
  import { PresentationRate, WithTitle } from '@/types';
  import Modal from '@/components/Modal.vue';
  import { SET_PRESENTATION_UNDER_RATE } from '@/store/presentations';
  import StarRating from 'vue-star-rating';
  import axios from 'axios';


  @Component({
    components: { Modal, StarRating },
  })
  export default class PresentationRateModal extends Vue {
    @Prop({ required: true, default: null })
    public presentationRate!: PresentationRate | null;
    public rate: number = 0;
    public presentation: WithTitle | null = null;
    public comment = '';

    @Emit()
    public close() {
      this.$store.commit(SET_PRESENTATION_UNDER_RATE, { rate: 0, presentation: null });
      return true;
    }

    @Watch('presentationRate')
    private changed(newValue: PresentationRate) {
      if (newValue.presentation) {
        this.presentation = newValue.presentation;
        this.rate = newValue.rate;
      }
    }

    public save() {
      if (this.presentation) {
        axios
          .put(`/api/presentations/${this.presentation.id}/ratings`, { value: this.rate, comment: this.comment })
          .then(() => this.close());
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

    .ratingModal__title {
        margin-top: 0;
    }
</style>
