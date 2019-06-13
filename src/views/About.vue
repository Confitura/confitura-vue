<template>
    <div class="about__page">
        <PageHeader title="About Us" type="coder"/>
        <Box color="white">
            <div class="about__info">
                <h2 class="about__header">Confitura is created by Java community members since 2007.</h2>
                <PageFragment name="about-page" class="about__infoContent"/>
            </div>
        </Box>
        <Box color="red" class="about__committee no-padding">
            <h3 class="committee__header">organizers</h3>
            <div class="committee__member" v-for="member in committee">
                <img :src="member.photo" :alt="member.name" class="member__photo">
                <div class="member__info">
                    <div class="member__name">{{member.name}}</div>
                    <div class="member__bio">{{member.bio}}</div>
                    <div class="member__social">
                        <SocialLink type="twitter" :id="member.twitter" theme="white" class="member__socialLink"></SocialLink>
                        <SocialLink type="github" :id="member.github" theme="white" class="member__socialLink"></SocialLink>
                        <SocialLink type="www" :id="member.www" theme="white" class="member__socialLink"></SocialLink>
                    </div>
                </div>
            </div>
        </Box>
        <Box color="white" class="no-padding">
            <div class="volunteers__headerContainer">
                <h3 class="volunteers__header">volunteers</h3>
            </div>
            <UsersGrid :users="volunteers"></UsersGrid>
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
  import { EmbeddedUserProfiles, UserProfile } from '@/types';
  import SocialLink from '@/components/SocialLink.vue';
  import UsersGrid from '@/views/UsersGrid.vue';

  @Component({
    components: { UsersGrid, SocialLink, PageHeader, Box, TheContact, PageFragment },
  })
  export default class About extends Vue {
    public committee: UserProfile[] = [];
    public volunteers: UserProfile[] = [];

    public mounted(): void {
      axios.get<EmbeddedUserProfiles>('/api/users/search/admins')
        .then((it) => it.data._embedded.publicUsers)
        .then((users) => this.committee = users);

      axios.get<EmbeddedUserProfiles>('/api/users/search/admins')
        .then((it) => it.data._embedded.publicUsers)
        .then((users) => this.volunteers = users);
    }
  }

</script>

<style lang="scss" scoped>
    @import "../assets/colors";
    @import "../assets/sizes";
    @import "../assets/media";
    @import "../assets/fonts";

    .about__page {
        overflow: hidden;
    }

    .about__info {
        display: flex;
        flex-direction: column;

        .about__header {
            font-size: 2.5rem;
            color: $brand;

        }

        .about__infoContent {
            font-size: 1.2rem;
            line-height: 1.4rem;
        }
    }

    .about__committee {
        background-color: $brand;
        color: #ffffff;
    }

    .committee__header, .volunteers__header {
        font-weight: bold;
        font-size: 2rem;
        margin: 2rem;
        padding: 0;
    }

    .member__photo {
        width: 100vw;
        height: 100vw;
        object-fit: cover;
    }

    .member__info {
        padding: 1.5rem;
    }

    .member__name {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
    }

    .member__bio {
        font-size: 1.1rem;
        line-height: 1.3rem;
        margin-bottom: 1rem;

    }

    .member__socialLink {
        color: #ffffff;
        font-size: 1.5rem;
        margin-right: 0.7rem;
    }


    .volunteers__headerContainer{
        background-color: $brand;
        display: flex;
        color: #ffffff;
        padding-top: 2rem;
    }
</style>

