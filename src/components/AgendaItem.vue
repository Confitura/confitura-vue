<template>
    <div class="agendaItem">
        <div v-if="entry.presentationId">
            <div>{{entry.presentation.title}}</div>
            <div v-for="speaker in entry.speaker">{{speaker.name}}</div>
        </div>
        <div v-else>
            {{entry.label}}
        </div>
    </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { AgendaEntry } from '@/views/Agenda.vue';

  @Component({})
  export default class AgendaItem extends Vue {
    @Prop({required: true})
    public entry!: AgendaEntry;


  }
</script>

<style scoped lang="scss">
    @import "../assets/sizes";
    @import "../assets/media";
    @import "../assets/colors";
    .agendaItem {
        padding: 1rem;
        font-size: 1rem;
        &__entry--all{
            /*justify-self: center;*/
            color: $brand;
            font-weight: bold;
            font-size: 1.2rem;
        }
    }
</style>
