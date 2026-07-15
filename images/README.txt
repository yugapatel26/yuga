Drop your images in this folder, then swap the placeholders in index.html.

Suggested filenames (referenced by the placeholders):
  profile.jpg    -> round headshot in the About view
  project-1.jpg  -> 16:9 image for the featured project

To use an image, find the matching placeholder <div> in index.html and
replace it with an <img> tag. Keep loading="lazy" and width/height so the
layout doesn't jump when the real image loads.

About headshot — replace:
    <div class="avatar placeholder" ...><span>photo</span></div>
  with:
    <img src="images/profile.jpg" alt="Yuga Patel" class="avatar"
         width="132" height="132" loading="lazy" decoding="async" />

Featured project image — replace:
    <div class="feature__shot placeholder" ...><span>project image</span></div>
  with:
    <img src="images/project-1.jpg" alt="Project One screenshot"
         class="feature__shot" width="1280" height="720"
         loading="lazy" decoding="async" />

The .avatar / .feature__shot classes keep the same shape and hover behavior,
so the layout won't shift when you swap in a real image.

Résumé: put a file named resume.pdf in the PROJECT ROOT (one level up from
this folder) and the "Download résumé (PDF)" link in the Experience view
will work automatically.
