<template>
    <div>
        <button @click="unlike()" v-if="isLiked">UNLIKE</button>
        <button @click="like()" v-else>LIKE</button>
    </div>
</template>

<script lang="ts">

  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { Like } from '@/types';
  import { DELETE_LIKE, LOAD_LIKES, SAVE_LIKE } from '@/store/vote4papers';

  @Component({
    components: {},
  })
  export default class LikeButton extends Vue {
    @Prop(String)
    public presentationId!: string;

    get likes(): Like[] {
      return this.$store.state.v4p.likes;
    }

    get isLiked(): boolean {
      return !!this.findLike();
    }

    public like() {
      this.$store.dispatch(SAVE_LIKE, { presentationId: this.presentationId })
        .then(() => this.$store.dispatch(LOAD_LIKES));
    }

    public unlike() {
      const like = this.findLike();
      if (like && like.id) {
        this.$store.dispatch(DELETE_LIKE, { id: like.id })
          .then(() => this.$store.dispatch(LOAD_LIKES));
      }
    }

    private findLike(): Like | undefined {
      return this.likes.find((it) => it.presentationId === this.presentationId);
    }

  }
</script>

<style lang="scss" scoped>
</style>
