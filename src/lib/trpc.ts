// Minimal client mock for tRPC-like calls. Replace with your real tRPC setup.


export const api = {
async fetchVideos() {
return Promise.resolve([{ id: '1', title: 'Video 1' }]);
}
};