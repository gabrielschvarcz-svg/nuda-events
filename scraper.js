import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

// TEST EVENTY (neskôr nahradíme webmi/API)
const events = [
  {
    city: "Komárno",
    title: "Deň detí v Komárne",
    date: "2026-06-01",
    description: "Mestské podujatie pre deti a rodiny",
    category: "kids",
    link: ""
  },
  {
    city: "Nové Zámky",
    title: "Porcinkula festival",
    date: "2026-08-01",
    description: "Tradičný mestský festival",
    category: "festival",
    link: ""
  }
]

async function run() {
  for (const event of events) {

    const { data } = await supabase
      .from('events')
      .select('*')
      .eq('title', event.title)
      .eq('date', event.date)

    if (!data || data.length === 0) {
      await supabase.from('events').insert([event])
      console.log("Inserted:", event.title)
    } else {
      console.log("Already exists:", event.title)
    }
  }
}

run()
