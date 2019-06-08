<template>
    <div class="particiate">
        <PageHeader :small="true" title="Join the conference!"></PageHeader>
        <Box :full="false" class="content " color="white">
            <p v-if="!form">
                Unable to register as participant:
                <span v-for="error in errors.voucher">
                    <br/>
                    <span v-if="error === 'INVALID'">invalid voucher</span>
                    <span v-if="error === 'TAKEN'">voucher already used</span>
                    <span v-else>unknown error {{error}}</span>
                </span>
            </p>
            <div class="back-office" v-else>
                <p>Provide us with required data and you will be ready to meet us at the main event! :)</p>
                <div class="row">
                    <form @submit="save" class="col s12" novalidate>
                        <div class="row">
                            <div class="input-field col s12">
                                <input class="" id="first_name" required
                                       type="text" v-model="form.firstName">
                                <label for="first_name">First name</label>
                                <span class="errors helper-text" v-for="error in errors.name">{{error}}</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input class="" id="last_name" required
                                       type="text" v-model="form.lastName">
                                <label for="last_name">Last name</label>
                                <span class="errors helper-text" v-for="error in errors.name">{{error}}</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <input id="email" required
                                       type="email" v-model="form.email">
                                <label for="email">E-mail</label>
                                <span class="errors helper-text" v-for="error in errors.email">{{error}}</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <select v-model="form.gender">
                                    <option disabled selected value="">select</option>
                                    <option value="m">Male</option>
                                    <option value="f">Female</option>
                                </select>
                                <label>T-shirt cut</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <select v-model="form.size">
                                    <option disabled selected value="">select</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="XXL">XXL</option>
                                </select>
                                <label>T-shirt size</label>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col s12">
                                <label>
                                    <input id="privacyPolicyAccepted" required
                                           type="checkbox" v-model="form.privacyPolicyAccepted">
                                    <span>I accept the <router-link
                                            to="privacy-policy">privacy policy</router-link></span>
                                </label>
                                <div class="errors helper-text" v-for="error in errors.privacyPolicyAccepted">
                                    {{error}}
                                </div>

                            </div>
                        </div>

                        <div class="row">
                            <h4 class="text-center">Statistical data</h4>
                            <div>This data will be used for statistics only, and will not be associated with your
                                personal profile. Thanks to them we will be
                                able to better tailor our agenda to the needs of our participants in future editions.
                            </div>
                        </div>


                        <div class="input-field col s12">
                            <select id="mealOption" name="mealOption" placeholder="meal option">
                                <option disabled selected value="">select</option>
                                <option value="meat">Meat</option>
                                <option value="vegetarian">Vegetarian</option>
                            </select>
                            <label>Meal option</label>

                            <div class="helper-text">
                                We can't promise that you will be able to get option that you have selected. The food at
                                configtura will not be portioned, so first come - first served.
                            </div>
                            <!--<mat-error *ngIf="mealOption?.hasError('required')">
                                This field is required
                            </mat-error>-->
                        </div>

                        <div class="input-field col s12">
                            <input id="city" maxlength="255" name="city" required>
                            <label for="city">City</label>

                            <!--  <mat-error *ngIf="city?.hasError('required')">
                                  This field is required
                              </mat-error>-->
                        </div>

                        <div class="input-field col s12">
                            <select id="experience" name="experience"
                                    placeholder="your experience"
                                    required>
                                <option disabled selected value="">select</option>
                                <option value="I am just learning">I am just learning</option>
                                <option value="Less than a year">Less than a year</option>
                                <option value="1-2 years">1-2 years</option>
                                <option value="2-4 years">2-4 years</option>
                                <option value="4-8 years">4-8 years</option>
                                <option value="Over 8 years">Over 8 years</option>
                            </select>
                            <label>Experience</label>

                            <!-- <mat-error *ngIf="experience?.hasError('required')">
                                 This field is required
                             </mat-error>-->
                        </div>

                        <div class="input-field col s12">
                            <select id="role" name="role" placeholder="your role" required>
                                <option disabled selected value="">select</option>

                                <option value="student">Student</option>
                                <option value="Developer">Developer</option>
                                <option value="Team Leader">Team Leader</option>
                                <option value="Project Leader">Project Leader</option>
                                <option value="Architect">Architect</option>
                                <option value="Tester">Tester</option>
                                <option value="Other">Other</option>
                            </select>
                            <label>Your role</label>

                            <!-- <mat-error *ngIf="role?.hasError('required')">
                                 This field is required
                             </mat-error>-->
                        </div>

                        <span v-for="error in errors.form">
                             {{error}} <br/>
                        </span>

                        <div>
                            <button class="btn waves-effect waves-light button button--save" name="action"
                                    type="submit">Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </Box>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Box from '@/components/Box.vue';
import TheContact from '@/components/TheContact.vue';
import M from 'materialize-css';
import axios from 'axios';
import PageHeader from '@/components/PageHeader.vue';
import { RegistrationForm, Participant } from '@/types';
import { validEmail } from '@/validation-utils';

@Component({
  components: { PageHeader, Box, TheContact },
})
export default class ParticipatePage extends Vue {
  public form: RegistrationForm | null = null;
  public errors: any = {};

  public mounted() {
    M.AutoInit();
    const { voucher } = this.$route.query;
    axios.get(`/api/vouchers/${voucher}/check`).then((value) => {
      this.form = { voucher: { id: voucher as string } };

      setTimeout(() => {
        M.updateTextFields();
        M.FormSelect.init(document.querySelectorAll('select'));
      });
    }, (reason) => {
      this.errors = { voucher: [reason.response.data] };
    });
  }

  public updated() {
    M.updateTextFields();
  }

  public save(event: Event) {
    event.preventDefault();
    if (this.validate()) {
      // do save
      axios.post<Participant>('/api/participants', this.form)
        .then((it) => {
          const id: string = it.data.id as string;
          this.$router.push({ name: 'participant', params: { id } });
        });
    }
  }


  private validate() {
    const errors: any = {};
    if (this.form == null) {
      return false;
    }
    let valid = true;

    if (!this.form.email || !validEmail(this.form.email)) {
      errors.email = ['invalid email'];
      valid = false;
    }
    if (!this.form.firstName) {
      errors.name = ['Name is required'];
      valid = false;
    }
    if (!this.form.lastName) {
      errors.name = ['Last name is required'];
      valid = false;
    }
    if (!this.form.privacyPolicyAccepted) {
      errors.privacyPolicyAccepted = ['Agreeing to our policy is required'];
      valid = false;
    }
    this.errors = errors;
    return valid;
  }
}
</script>

<style lang="scss" scoped>

    .back-office {
        padding-top: 10vh;
    }

    .errors {
        color: red !important;
    }


</style>
