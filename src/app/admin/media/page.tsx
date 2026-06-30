import { getUploads } from '../admin-actions'
import MediaUpload from './media-upload'

export default async function MediaPage() {
  const images = await getUploads()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-warm-gray">Media Library</h1>
      </div>

      <MediaUpload />

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="card overflow-hidden group relative">
            <div className="aspect-square bg-gray/10 relative">
              <img src={img.url} alt={img.alt || img.filename} className="w-full h-full object-cover" />
            </div>
            <div className="p-2">
              <p className="text-xs text-gray truncate">{img.filename}</p>
              <form action={`/api/upload/delete?id=${img.id}`} method="POST">
                <button type="submit" className="text-xs text-red-500 hover:underline mt-1">Delete</button>
              </form>
            </div>
          </div>
        ))}
        {images.length === 0 && (
          <p className="text-gray col-span-full text-center py-12">No images uploaded yet.</p>
        )}
      </div>
    </div>
  )
}
