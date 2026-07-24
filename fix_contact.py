import re

with open('src/components/ContactLocation.tsx', 'r') as f:
    content = f.read()

# 1. Remove the entire Left Side: Map Embed
# Finding the block
start_idx = content.find('{/* Left Side: Map Embed (lg:col-span-6) */}')
end_idx = content.find('{/* Right Side: Contact Cards + Letter Message Form (lg:col-span-6) */}')
if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + content[end_idx:]

# 2. Change the layout of Right Side to be centered since it's the only one left
content = content.replace('className="lg:col-span-6 flex flex-col justify-between gap-8"', 'className="lg:col-span-12 max-w-4xl mx-auto w-full flex flex-col justify-between gap-8"')

# 3. Change Address div to anchor tag with the google maps link
old_address = """{/* Address */}
              <div className="p-5 rounded bg-hotel-cream border border-hotel-sand/35 flex gap-4 text-left shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-hotel-gold/10 text-hotel-gold">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans text-[10px] font-bold tracking-widest text-hotel-gold uppercase mb-1">
                    {'ADDRESS'}
                  </h4>
                  <p className="font-serif text-sm text-hotel-charcoal leading-snug font-semibold">
                    {CONTACT_INFO.address}
                  </p>
                  <span className="text-[10px] text-hotel-stone/50 font-sans block mt-0.5">
                    {'100m from Black Church'}
                  </span>
                </div>
              </div>"""

new_address = """{/* Address */}
              <a href="https://www.google.com/maps/place/Hotel+Boutique+Casa+Chitic+-+Str.+Johann+Gott+nr.7/@45.6413547,25.5908935,17z/data=!4m21!1m11!3m10!1s0x40b35b2ea02a0bb5:0x6ef2f837aa20b6b!2sHotel+Boutique+Casa+Chitic+-+Str.+Johann+Gott+nr.7!5m2!4m1!1i2!8m2!3d45.6413665!4d25.5906935!10e5!16s%2Fg%2F11j20fdtxw!3m8!1s0x40b35b2ea02a0bb5:0x6ef2f837aa20b6b!5m2!4m1!1i2!8m2!3d45.6413665!4d25.5906935!16s%2Fg%2F11j20fdtxw?entry=ttu&g_ep=EgoyMDI2MDcyMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="p-5 rounded bg-hotel-cream border border-hotel-sand/35 flex gap-4 text-left shadow-sm hover:border-hotel-gold transition-colors cursor-pointer block w-full">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-hotel-gold/10 text-hotel-gold">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans text-[10px] font-bold tracking-widest text-hotel-gold uppercase mb-1">
                    {'ADDRESS'}
                  </h4>
                  <p className="font-serif text-sm text-hotel-charcoal leading-snug font-semibold group-hover:text-hotel-terracotta transition-colors">
                    {CONTACT_INFO.address}
                  </p>
                  <span className="text-[10px] text-hotel-stone/50 font-sans block mt-0.5">
                    {'100m from Black Church'}
                  </span>
                </div>
              </a>"""

content = content.replace(old_address, new_address)

with open('src/components/ContactLocation.tsx', 'w') as f:
    f.write(content)
