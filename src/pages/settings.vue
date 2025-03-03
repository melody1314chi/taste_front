<template>
  <div class="d-flex justify-center align-center">
    <div class="container">
      <h1>{{ $t('accountSetup.title') }}</h1>
      <v-col cols="12">
        <v-form>
          <v-text-field
            v-model="displayName"
            :label="$t('accountSetup.displayName')"
            required
          />
          <v-text-field
            v-model="username"
            :label="$t('accountSetup.username')"
            required
          />
          <v-textarea
            v-model="bio"
            :label="$t('accountSetup.bio')"
            rows="3"
          />
          <v-text-field
            v-model="email"
            :label="$t('accountSetup.email')"
            required
          />
          <v-avatar>
            <v-img :src="avatar" />
            <v-file-input
              v-model="avatarFile"
              :label="$t('accountSetup.uploadAvatar')"
              accept="image/*"
            />
          </v-avatar>
          <h2>{{ $t('accountSetup.notificationSettings') }}</h2>
          <v-switch
            v-model="newRecipeUploads"
            :label="$t('accountSetup.newRecipeUploads')"
          />
          <v-switch
            v-model="newCommentNotifications"
            :label="$t('accountSetup.newCommentNotifications')"
          />
          <v-switch
            v-model="newMessageNotifications"
            :label="$t('accountSetup.newMessageNotifications')"
          />
          <h2>{{ $t('accountSetup.favoriteTags') }}</h2>
          <v-chip-group
            v-model="favoriteTags"
            multiple
          >
            <v-chip
              v-for="tag in tags"
              :key="tag"
              :value="tag"
            >
              {{ tag }}
            </v-chip>
          </v-chip-group>
        </v-form>
      </v-col>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        displayName: '',
        username: '',
        bio: '',
        email: '',
        avatar: '',
        avatarFile: null,
        newRecipeUploads: false,
        newCommentNotifications: false,
        newMessageNotifications: false,
        favoriteTags: [],
        tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
      }
    }
  },
mounted() {
    axios.get('/api/user')
      .then((response) => {
        Object.assign(this.user, response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
</script>
