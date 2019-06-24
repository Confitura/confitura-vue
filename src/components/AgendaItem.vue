<template>
    <div class="agendaItem" :class="{
    'agendaItem--withPresentation': entry.presentationId,
    'loggedIn': isLogin,
    'selected': isSelected}">
        <div v-if="entry.roomLabel" class="agendaItem__room">{{entry.roomLabel}}</div>
        <div v-if="entry.presentationId" @click="select(entry.presentation)">
            <div class="agendaItem__title">{{entry.presentation.title}}</div>
            <div class="agendaItem__speakers">
                <span class="agendaItem__speaker" v-for="speaker in entry.speaker">{{speaker.name}}</span>
            </div>
            <PresentationMetadata
                    :presentation="entry.presentation"
                    :showTags="false"
                    class="agendaItem__metadata"></PresentationMetadata>
        </div>
        <div v-else class="agendaItem__label">
            {{entry.label}}
        </div>
        <div class="agendaItem__personal" v-if="isLogin && entry.presentationId">
            <i v-if="isSelected" class="fas fa-calendar-check" @click="addToPersonalAgenda"></i>
            <i v-else class="far fa-calendar-plus"></i>
        </div>
    </div>
</template>

<script lang="ts">
  import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
  import { AgendaEntry } from '@/views/Agenda.vue';
  import PresentationMetadata from '@/components/PresentationMetadata.vue';
  import PresentationModal from '@/components/PresentationModal.vue';
  import { Presentation } from '@/types';
  import { ADD_TO_PERSONAL_AGENDA } from '@/store/store.user-profile';

@Component({
  components: { PresentationModal, PresentationMetadata },
})
export default class AgendaItem extends Vue {

  get personalAgenda(): AgendaEntry[] {
    return this.$store.state.userProfile.personalAgenda;
  }

  @Prop({ required: true })
  public entry!: AgendaEntry;

  @Emit()
  public select(presentation: Presentation) {
    return presentation;
  }

  public get isLogin() {
    return this.$store.getters.isLogin;
  }

  public get isSelected(): boolean {
    return !!this.personalAgenda.find((it) => it.id === this.entry.id);
  }

  public addToPersonalAgenda(event: Event) {
    event.preventDefault();
    const id = this.$store.getters.user.jti;
    this.$store.dispatch(ADD_TO_PERSONAL_AGENDA, { id, agendaEntryId: this.entry.id });
  }
}
</script>

<style scoped lang="scss">
    @import "../assets/sizes";
    @import "../assets/media";
    @import "../assets/colors";

    .agendaItem {
        font-size: 1rem;
        padding: .7rem;
        display: flex;
        flex-direction: column;
        position: relative;

        &--withPresentation {
            cursor: pointer;

            &:hover {
                background-color: #DFDFDF;
            }
        }

        @include md() {
            padding: 1.5rem;
        }

        &__room {
            color: $brand;
            font-size: .8rem;
            margin-bottom: .5rem;
            @include md() {
                display: none;
            }
        }

        &__entry--all, &__label {
            color: $brand;
            font-weight: bold;
            font-size: 1.2rem;
            text-transform: capitalize;
        }

        &__label {
            justify-self: center;
        }

    }

    .agendaItem__speakers {
        font-size: 1rem;
        color: #767676;
        margin-top: 1rem;
    }

    .agendaItem__speaker {

        &:not(:last-child):after {
            content: ', ';
        }
    }

    .agendaItem__personal {
        color: $brand;
        position: absolute;
        top: 1em;
        right: 1em;
        cursor: pointer;
    }

    .agendaItem__metadata {
        font-size: 1rem;
        line-height: 1.2rem;
        margin-top: 0.3rem;
    }

    .loggedIn {
        opacity: 0.5;
    }

    .selected {
        opacity: 1;
    }
</style>
