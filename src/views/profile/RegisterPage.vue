<template>
    <div class="profile">
        <Box class="content " color="white" :full="false">

            <div class="back-office">
                <div class="row">
                    <form class="col s12" @submit="save">
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="full_name" type="text" class="validate"
                                       v-model="profile.name" required>
                                <label for="full_name">First Name</label>
                                <span class="helper-text" data-error="Field required" data-success="OK">{{errors.name}}</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="email" type="email" class="validate"
                                       v-model="profile.email" required>
                                <label for="email">e-mail</label>
                                <span class="helper-text" data-error="Required proper e-mail address"
                                      data-success="OK">{{errors.email}}</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <textarea id="Bio" type="text" class="materialize-textarea validate"
                                          minlength="100"
                                          v-model="profile.bio" required>
                                </textarea>
                                <label for="Bio">Bio</label>
                                <span class="helper-text" data-error="Should be at least 100 characters long"
                                      data-success="OK">{{errors.bio}}</span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col s12">
                                <label for="photo">Profile picture</label>
                                <input id="photo" type="file" class="validate"
                                       ref="file" v-on:change="handleFileUpload()"
                                       required>
                                <span class="helper-text" data-error="Field required" data-success="OK">{{errors.photo}}</span>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col s12">
                                <label>
                                    <input type="checkbox" v-model="profile.privacyPolicyAccepted"
                                           id="privacyPolicyAccepted" required>
                                    <span>I accept the privacy policy</span>
                                </label>
                                <span class="helper-text" data-error="Field required" data-success="OK">{{errors.privacyPolicyAccepted}}</span>

                            </div>
                        </div>
                        <span>
                            {{errors.form}}
                        </span>

                        <button class="btn waves-effect waves-light" type="submit" name="action">Submit
                            <i class="material-icons right">send</i>
                        </button>
                    </form>
                </div>
            </div>
        </Box>
        <TheContact id="contact"/>
    </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { LOAD_CURRENT_PROFILE } from '@/store.user-profile';
import Box from '@/components/Box.vue';
import TheContact from '@/components/TheContact.vue';
import { UserProfile } from '@/types';
import * as M from 'materialize-css/dist/js/materialize.js'

import axios from 'axios';

@Component({
  components: { Box, TheContact },
})
export default class RegisterPage extends Vue {
  public $refs!: Vue['$refs'] & {
    file: {
      files: File[],
    },
  };
  public profile: UserProfile = {};
  public photo: File | null = null;
  public errors: RegisterErrors = {};
  // tslint:disable
  private emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // tslint:enable

  public mounted() {
    M.AutoInit();

    this.$store.dispatch(LOAD_CURRENT_PROFILE)
      .then(() => {
        this.profile = this.$store.state.userProfile.currentProfile;
      });
  }

  public updated() {
    M.updateTextFields();
  }

  public save(event: Event) {
    event.preventDefault();
    if (this.validate()) {
      axios
        .post<any>('/api/users', this.profile, { headers: { Authorization: `Bearer ${this.$store.state.token}` } })
        .then((it: any) => {
          this.uploadPhoto();
          return it;
        })
        .then((it: any) => {
          this.$router.push('/profile');
          return it;
        })
        .catch((error: any) => this.uploadFailed(error));
    }
  }

  public handleFileUpload() {
    const { files } = this.$refs.file;
    this.photo = files[0];
  }

  public validEmail(email: string) {
    return this.emailPattern.test(email);
  }

  private uploadPhoto() {
    if (this.photo !== null && this.profile !== null) {
      const formData = new FormData();
      formData.append('file', this.photo);
      const headers = { Authorization: `Bearer ${this.$store.state.token}` };
      return axios
        .post(`/api/resources/${this.profile.id}`, formData, { headers });
    }
  }

  private validate() {
    this.errors = {};
    let valid = true;
    if (this.profile === null) {
      return;
    }
    if (!this.validEmail(this.profile.email)) {
      this.errors.email = ['invalid email'];
      valid = false;
    }
    if (!this.photo) {
      this.errors.photo = ['Photo is required'];
      valid = false;
    }
    if (!this.profile.name) {
      this.errors.name = ['Name is required'];
      valid = false;
    }
    if (!this.profile.bio || this.profile.bio.length < 100) {
      this.errors.bio = ['Bio should be at least 100 characters long'];
      valid = false;
    }
    if (!this.profile.privacyPolicyAccepted) {
      this.errors.privacyPolicyAccepted = ['Agreeing to our policy is required'];
      valid = false;
    }
    return valid;
  }

  private uploadFailed(error: any) {
    this.errors = {
      form: [
        'Submit failed',
        error.response.data.message,
      ],
    };
  }
}

interface RegisterErrors {
  bio?: string[];
  email?: string[];
  photo?: string[];
  name?: string[];
  privacyPolicyAccepted?: string[];
  form?: string[];
}
</script>

<style lang="scss" scoped>
    .back-office {
        padding-top: 10vh;
    }
    .errors {
        color: red;
    }
</style>
