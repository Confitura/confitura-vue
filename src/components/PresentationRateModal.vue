<template>
    <Modal v-if="presentation" @close="close()">
        <div>hello world</div>
    </Modal>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
  import { Presentation } from '@/types';
  import Modal from '@/components/Modal.vue';


  @Component({
    components: { Modal },
  })
  export default class PresentationRateModal extends Vue {
    @Prop({ required: true })
    public readonly presentation!: Presentation;

    @Emit()
    public close() {
      return true;
    }

  }
</script>

<style scoped>

</style>
