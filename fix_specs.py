import re

with open('src/components/RoomTypes.tsx', 'r') as f:
    content = f.read()

# 1. Update the cloudbeds URL
content = content.replace(
    'href="https://hotels.cloudbeds.com/en/reservation/OYwpJm/?currency=ron&checkin=2027-06-18&checkout=2027-06-19"',
    'href="https://hotels.cloudbeds.com/en/reservation/OYwpJm/?currency=ron"'
)

# 2. Add 'Check' to lucide-react imports if not there
if 'Check,' not in content and '{ Check ' not in content:
    content = content.replace('ChevronDown,', 'ChevronDown, Check,')

# 3. Add showSpecs state
if 'const [showSpecs, setShowSpecs] = useState(false);' not in content:
    content = content.replace('const [currentImageIdx, setCurrentImageIdx] = useState(0);', 
                              'const [currentImageIdx, setCurrentImageIdx] = useState(0);\n  const [showSpecs, setShowSpecs] = useState(false);')

# 4. Modify SPECS button
old_btn = """<button className="flex items-center justify-center gap-2 py-3.5 border border-hotel-sand hover:bg-gray-50 transition-colors text-[10px] font-bold uppercase tracking-widest text-hotel-charcoal">
            SPECS <ChevronDown className="w-3.5 h-3.5" />
          </button>"""
new_btn = """<button onClick={() => setShowSpecs(!showSpecs)} className="flex items-center justify-center gap-2 py-3.5 border border-hotel-sand hover:bg-gray-50 transition-colors text-[10px] font-bold uppercase tracking-widest text-hotel-charcoal">
            SPECS <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showSpecs ? 'rotate-180' : ''}`} />
          </button>"""
content = content.replace(old_btn, new_btn)

# 5. Add amenities section after the actions div
old_actions = """<a
            href="https://hotels.cloudbeds.com/en/reservation/OYwpJm/?currency=ron"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center py-3.5 bg-hotel-gold hover:bg-hotel-gold-dark transition-colors text-[10px] font-bold uppercase tracking-widest text-white"
          >
            BOOK STAY
          </a>
        </div>"""
new_actions = """<a
            href="https://hotels.cloudbeds.com/en/reservation/OYwpJm/?currency=ron"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center py-3.5 bg-hotel-gold hover:bg-hotel-gold-dark transition-colors text-[10px] font-bold uppercase tracking-widest text-white"
          >
            BOOK STAY
          </a>
        </div>
        
        <AnimatePresence>
          {showSpecs && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t border-hotel-sand">
                <h4 className="font-serif text-lg text-hotel-charcoal mb-4">Accommodation Amenities</h4>
                <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
                  {[
                    "220-240 volt circuits", "Air-conditioning",
                    "AM / FM radio", "Cable television",
                    "Cribs upon request", "Hairdryer",
                    "Slippers", "Wireless internet (WiFi)"
                  ].map((amenity, i) => (
                    <li key={i} className="flex items-start gap-2 text-hotel-stone">
                      <Check className="w-4 h-4 text-hotel-gold shrink-0 mt-0.5" />
                      <span className="font-sans text-[11px] leading-tight">{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>"""
content = content.replace(old_actions, new_actions)

with open('src/components/RoomTypes.tsx', 'w') as f:
    f.write(content)

