import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react"
import { CatContainer, ListContainer } from "./styles";

export function List() {
    const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

    const [cats, setCats] = useState<any[]>()
    const [imageLoaded, setImageLoaded] = useState<boolean>(false)

    useEffect(() => {
        getAllCats()
    }, [])

    const getAllCats = async () => {
        const { data } = await supabase
            .from('cats')
            .select()
            .order('rate', { ascending: false })
            .limit(10)

        if(data) {
            setCats(data)
        }
    }
 
  return (
    <ListContainer>
        <div>
            <h1>Top 10 so far:</h1>
            {cats && cats.map(cat =>
                <CatContainer key={cat.id}>
                    <img
                        onLoad={() => setImageLoaded(true)}
                        src={"https://cataas.com/" + cat.url}   
                    />
                    {
                        imageLoaded && <span>Votes: {(cat.rate).toFixed(2)*100}%</span>
                    }
                </CatContainer>        
            )}
        </div>
    </ListContainer>
  )
}