function showUploadWidget() {
  cloudinary.openUploadWidget(
    {
      cloudName: 'dz4kg3wjw',
      uploadPreset: 'power_trip',
      sources: ['local'],
      googleApiKey: '<image_search_google_api_key>',
      showAdvancedOptions: true,
      cropping: false,
      multiple: true,
      defaultSource: 'local',
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
    (err, result) => {
      console.log(result.info.secure_url);
    }
  );
}

$('#upload_widget').on('click', async (event) => {
  event.preventDefault();
  await showUploadWidget();
});
