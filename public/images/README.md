# Menü ve Instagram görselleri

Menü önizleme ızgarası için 6'ya kadar kare görsel ekleyebilirsiniz:

    public/images/menu-1.jpg … public/images/menu-6.jpg

Sonra `src/app/site-config.ts` içindeki `menuPhotos` dizisini doldurun:

```ts
menuPhotos: [
  "/images/menu-1.jpg",
  "/images/menu-2.jpg",
  // …
],
```

Instagram önizleme ızgarası için 6'ya kadar kare görsel ekleyebilirsiniz:

    public/images/ig-1.jpg … public/images/ig-6.jpg

Sonra `src/app/site-config.ts` içindeki `instagramPhotos` dizisini doldurun:

```ts
instagramPhotos: [
  "/images/ig-1.jpg",
  "/images/ig-2.jpg",
  // …
],
```

Boş bırakılan kareler şık birer "MAF" placeholder olarak gösterilir.
