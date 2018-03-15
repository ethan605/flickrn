export default function buildMockState() {
  const photoInfo = {
    data: undefined,
    errorMessage: undefined,
    loading: false,
  };

  const photos = {
    currentPage: 1,
    data: [],
    errorMessage: undefined,
    hasMore: true,
    loading: false,
  };

  return { photoInfo, photos };
}
