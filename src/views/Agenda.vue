<template>
    <div class="agendaPage">
        <PageHeader title="Agenda" type="peace"/>

        <Box color="white" class="no-padding">
            <div class="agenda">
                <div class="agendaItem--empty"></div>
                <div v-for="room in rooms" class="agendaItem__room">
                    {{room.label}}
                </div>
                <template v-for="slot in slots">
                    <div class="agendaItem__slot">
                        {{slot.label}}
                    </div>
                    <template v-for="room in rooms">
                        <template v-if="hasSingleEntryFor(slot)">
                            <AgendaItem
                                    :entry="getEntryFor(room, slot)"
                                    class="agendaItem__entry agendaItem__entry--all"
                                    :class="`agendaItem__entry--${room.displayOrder}`"
                            ></AgendaItem>
                        </template>

                        <AgendaItem
                                v-else
                                :entry="getEntryFor(room, slot)"
                                class="agendaItem__entry"></AgendaItem>
                    </template>
                </template>

            </div>
        </Box>

        <TheContact id="contact"/>
    </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Box from '@/components/Box.vue';
  import PageHeader from '@/components/PageHeader.vue';
  import TheContact from '@/components/TheContact.vue';
  import PageFragment from '@/components/PageFragment.vue';
  import axios from 'axios';
  import SocialLink from '@/components/SocialLink.vue';
  import UsersGrid from '@/views/UsersGrid.vue';
  import { Presentation } from '@/types';
  import AgendaItem from '@/components/AgendaItem.vue';

  @Component({
    components: { AgendaItem, UsersGrid, SocialLink, PageHeader, Box, TheContact, PageFragment },
  })
  export default class Agenda extends Vue {
    public rooms: Room[] = [];
    public slots: TimeSlot[] = [];
    public agenda: AgendaEntry[] = [];
    private sortByOrder = (a: WithOrder, b: WithOrder) => a.displayOrder - b.displayOrder;

    public mounted(): void {
      axios.get<EmbeddedRooms>(`/api/rooms`)
        .then((it) => it.data._embedded.rooms)
        .then((rooms) => rooms.sort(this.sortByOrder))
        .then((rooms) => this.rooms = rooms);

      axios.get<EmbeddedTimeSlots>(`/api/time-slots`)
        .then((it) => it.data._embedded.timeSlots)
        .then((slots) => slots.sort(this.sortByOrder))
        .then((slots) => this.slots = slots);

      axios.get<EmbeddedAgenda>(`/api/agenda`)
        .then((it) => it.data._embedded.agendaEntries)
        .then((agenda) => this.agenda = agenda);
    }

    public getEntryFor(room: Room, slot: TimeSlot): AgendaEntry {
      // debugger;
      const entry = this.agenda
        .find((entry) => entry.timeSlotId === slot.id && (entry.roomId === null || entry.roomId === room.id));
      // console.log(entry);
      return entry || { id: 'empty', label: 'empty' };
    }

    public hasSingleEntryFor(slot: TimeSlot): boolean {
      const entry = this.agenda.find((entry) => entry.timeSlotId === slot.id);
      return entry !== undefined && entry.roomId === null;
    }


  }

  interface EmbeddedRooms {
    _embedded: { rooms: Room[] }
  }

  interface EmbeddedTimeSlots {
    _embedded: { timeSlots: TimeSlot[] }
  }

  interface EmbeddedAgenda {
    _embedded: { agendaEntries: AgendaEntry[] }
  }

  interface Room extends WithOrder {
    label: string;
    id: string;
  }

  interface TimeSlot extends WithOrder {
    label: string;
    id: string;
    forAllRooms: boolean;
  }

  interface WithOrder {
    displayOrder: number;
  }

  export interface AgendaEntry {
    id: string;
    label: string;
    presentation?: Presentation;
    presentationId?: string;
    roomId?: string;
    roomLabel?: string;
    timeSlotId?: string;
    timeSlotLabel?: string;
  }

</script>

<style lang="scss" scoped>
    @import "../assets/colors";
    @import "../assets/sizes";
    @import "../assets/media";
    @import "../assets/fonts";

    .agenda {
        display: grid;
        grid-template-columns: 100px 1fr 1fr 1fr 1fr 1fr;
    }
    .agendaItem__room, .agendaItem--empty {
        font-size: 1.5rem;
        line-height: 1.7rem;
        font-weight: bold;
        padding: 2rem;
        justify-self: stretch;
        align-self: stretch;
        text-align: center;
        border-bottom: 4px solid $brand;
        border-left: 1px solid #DFDFDF;;
        border-right: 1px solid #DFDFDF;;
    }
    .agendaItem--empty {
        border-left: none;
    }

    .agendaItem__entry--all {
        grid-column: 2 / -1;
        &:not([class$="--0"]){
            display: none;
        }
    }


</style>

