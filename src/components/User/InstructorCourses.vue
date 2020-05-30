  <template>
  <div>
    <p v-if="!editCourseMode">
      {{course.name}} ({{course.abbreviation}}) za {{course.faculty.abbreviation}} | {{course.instructor_course.price}} kn/h
      <button
        class="small-button"
        @click="editCourseMode=true"
      >Izmijeni</button>
      <button class="small-button" @click="deleteCourse">Obriši</button>
    </p>
    <p v-if="editCourseMode">
      {{course.name}} ({{course.abbreviation}}) za {{course.faculty.abbreviation}} | Cijena: <input type="number" v-model="course.instructor_course.price" /> kn/h
      <button
        class="small-button"
        @click="saveNewPrice"
      >Spremi</button>
    </p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    props: ['course', 'instructorId'],
    data() {
        return {
            editCourseMode: false
        }
    },
    methods: {
        saveNewPrice() {
            this.editCourseMode = false;
            axios.post('/changePrice', {instructorId: this.instructorId, courseId: this.course.id, price: this.course.instructor_course.price})
            .then(resData => {
                console.log(resData);
            })
            .catch(err => console.log(err))
        },
        deleteCourse() {
            this.editCourseMode = false;
            axios.post('/deleteCourse', {instructorId: this.instructorId, courseId: this.course.id})
            .then(resData => {
                console.log(resData);
                this.$route.push('/home/my-instructor-profile');
            })
            .catch(err => console.log(err))
        }
    }
}
</script>
<style scoped>
.small-button{
    width: 100px;
    height: 30px;
    display:inline-block;
    margin: 0px;
}
input {
    width: 100px;
    display: inline-block;
}
</style>