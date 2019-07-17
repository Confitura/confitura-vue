<template>
  <Modal v-if="presentationRate" @close="close()">
    <div class="ratingModal__body">
      <h2 class="ratingModal__title">{{ this.presentation.title }}</h2>
      <div class="ratingModal__rate">
        <star-rating
          v-model="rate"
          :star-size="30"
          :show-rating="false"
          :rounded-corners="true"
          :star-points="[
            23,
            2,
            14,
            17,
            0,
            19,
            10,
            34,
            7,
            50,
            23,
            43,
            38,
            50,
            36,
            34,
            46,
            19,
            31,
            17
          ]"
        ></star-rating>
      </div>
      <div class="ratingModal__comment">
        <md-field class="ratingModal__commentFiled">
          <label>comment</label>
          <md-textarea
            class="ratingModal__commentInput"
            v-model="comment"
            maxlength="300"
          ></md-textarea>
        </md-field>
      </div>

      <div class="ratingModal__actions">
        <md-button class="md-raised" @click="close()">Cancel</md-button>
        <md-button class="md-raised" @click="save()"
          >Save my feedback</md-button
        >
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import { PresentationRate, WithTitle } from "@/types";
import Modal from "@/components/Modal.vue";
import { RATE, SET_PRESENTATION_UNDER_RATE } from "@/store/presentations";
import StarRating from "vue-star-rating";

@Component({
  components: { Modal, StarRating }
})
export default class PresentationRateModal extends Vue {
  @Prop({ required: true, default: null })
  public presentationRate!: PresentationRate | null;
  public rate: number = 0;
  public presentation: WithTitle | null = null;
  public comment = "";

  public mounted(): void {
    console.log("abc");
  }

  @Emit()
  public close() {
    this.$store.commit(SET_PRESENTATION_UNDER_RATE, {
      rate: 0,
      presentation: null
    });
    return true;
  }

  public save() {
    this.$store
      .dispatch(RATE, {
        presentation: this.presentation,
        rate: this.rate,
        comment: this.comment
      })
      .then(() => this.close());
  }

  @Watch("presentationRate")
  private changed(newValue: PresentationRate) {
    if (newValue && newValue.presentation) {
      this.presentation = newValue.presentation;
      this.comment = "";
      this.rate = newValue.rate;
    }
  }
}
</script>

<style scoped lang="scss">
.ratingModal {
  &__body {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  &__title {
    margin-top: 0;
  }

  &__rate {
    margin-bottom: 1rem;
  }

  &__comment {
    flex-grow: 1;
    display: flex;
  }

  &__commentFiled {
    flex-direction: column;
    align-items: stretch;
  }

  &__commentInput {
    resize: none !important;
    max-height: none;
  }

  &__actions {
    text-align: right;
  }
}
</style>
