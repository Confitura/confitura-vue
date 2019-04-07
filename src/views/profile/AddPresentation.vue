<template>
    <div class="profile">
        <Box class="content" color="white">
            <div class="back-office">

                <div class="row">
                    <form class="col s12">
                        <div class="row">
                            <div class="input-field col s12">
                                <input class="validate" id="title" type="text" v-model="presentation.title">
                                <label for="title">Title</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col m6 s12">


                                <div class="input-field">
                                    <input class="autocomplete" id="autocomplete-input" type="text" v-model="tagInput">
                                    <label for="autocomplete-input">Tags</label>
                                </div>
                                <div>
                                    <div class="chip" v-for="tag in presentation.tags">
                                        {{tag.name}}
                                        <i @click="removeTag(tag)" class="close material-icons">close</i>
                                    </div>
                                </div>

                                <div class="input-field">
                                    <textarea class="materialize-textarea" id="shortDescription"
                                              v-model="presentation.shortDescription"></textarea>
                                    <label for="shortDescription">Short description</label>
                                </div>
                                <div class="input-field">
                                    <textarea class="materialize-textarea" id="description"
                                              v-model="presentation.description"></textarea>
                                    <label for="description">Full description</label>
                                </div>
                            </div>
                            <div class="col m6 s12">
                                <p>
                                    <label>
                                        <input type="checkbox" v-model="presentation.isWorkshop"/>
                                        <span>Workshop</span>
                                    </label>
                                </p>
                                <p>
                                    <label>
                                        <input name="language" type="radio" v-model="presentation.language" value="pl"/>
                                        <span>Polish</span>
                                    </label>
                                    <label>
                                        <input name="language" type="radio" v-model="presentation.language" value="en"/>
                                        <span>English</span>
                                    </label>
                                </p>

                                <p>
                                    <label>
                                        <input name="level" type="radio" v-model="presentation.level" value="novice"/>
                                        <span>Novice</span>
                                    </label>
                                    <label>
                                        <input name="level" type="radio" v-model="presentation.level"
                                               value="intermediate"/>
                                        <span>Intermediate</span>
                                    </label>
                                    <label>
                                        <input name="level" type="radio" v-model="presentation.level" value="master"/>
                                        <span>Master</span>
                                    </label>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>

                <button @click="save()" class="waves-effect waves-light btn">Save</button>
            </div>
        </Box>
        <TheContact id="contact"/>
    </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import TheContact from "@/components/TheContact.vue";
  import Box from '@/components/Box.vue';
  import M from 'materialize-css'
  import { Presentation, EmbeddedTags, Tag } from "@/types";
  import axios from 'axios';

  @Component({
    components: { Box, TheContact },
  })
  export default class AddPresentation extends Vue {
    public presentation: Presentation = {
      title: '',
      language: '',
      level: '',
      tags: [],
      shortDescription: '',
      description: '',
    };
    public tagInput = "";
    public tags: string[] = [];
    private tagsByName: { name: string, tag: Tag } = {};
    private userId: string;

    mounted() {
      this.userId = this.$store.getters.user.jti;

      this.setupTagsAutocomplete();


    }

    private setupTagsAutocomplete() {
      axios.get<EmbeddedTags>('/api/tags')
        .then(response => response.data._embedded.tags)
        .then(tags => {
          let data = {};
          for (let tag of tags) {
            data[tag.name] = null;
            this.tagsByName[tag.name] = tag;
          }
          var elems = document.querySelectorAll('.autocomplete');
          M.Autocomplete.init(elems, {
            data: data,
            onAutocomplete: (arg) => {
              this.tagInput = "";
              this.tags.push(arg);
              let tag = this.tagsByName[arg];
              this.presentation.tags.push(tag);
            }
          });
        });
    }

    save() {
      axios.post(`/api/users/${this.userId}/presentations`, this.presentation, {
        headers: {
          Authorization: `Bearer ${this.$store.state.authentication.token}`
        }
      }).then(() => this.$router.back());
    }

    public removeTag(tag) {
      this.tags = this.tags.filter(it => it != tag);
    }
  }
</script>
<style scoped>
    #shortDescription {
        min-height: 5em;
    }

    #description {
        min-height: 10em;
    }
</style>
