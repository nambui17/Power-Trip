async function addImage(url) {
  const tripId = $('#trip_title').data('tripid');
  const response = await fetch('/api/images', {
    method: 'POST',
    body: JSON.stringify({image_url: url, trip_id: tripId}),
    headers: { 'Content-Type': 'application/json'},
  });
}
const currentUsername = $('#trip_title').data('username')

function showUploadWidget() {
  cloudinary.openUploadWidget(
    {
      cloudName: 'dz4kg3wjw',
      uploadPreset: 'power_trip',
      sources: ['local'],
      googleApiKey: '<image_search_google_api_key>',
      showAdvancedOptions: true,
      folder: `${currentUsername}`,
      // Can crop and resize images in upload widget not sure if we want to do that though
      cropping: false,
      multiple: true,
      defaultSource: 'local',
      resourceType: 'image',
      styles: {
        palette: {
          window: '#FFFFFF',
          windowBorder: '#E46E14',
          tabIcon: '#E02020',
          menuIcons: '#259EB1',
          textDark: '#000000',
          textLight: '#FFFFFF',
          link: '#F77E01',
          action: '#EA4C4C',
          inactiveTabIcon: '#0E2F5A',
          error: '#F44235',
          inProgress: '#B95AE0',
          complete: '#20B832',
          sourceBg: '#E4EBF1',
        },
        fonts: {
          default: null,
          "'Fira Sans', sans-serif": {
            url: 'https://fonts.googleapis.com/css?family=Fira+Sans',
            active: true,
          },
        },
      },
    },
    async (err, result) => {
      await addImage(result.info.secure_url);
    }
  );
}

$('#upload_widget').on('click', async (event) => {
  event.preventDefault();
  await showUploadWidget();
});
