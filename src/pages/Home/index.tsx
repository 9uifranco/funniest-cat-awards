import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import { CurrentCatImage, MainContainer, ProgressIcon, Spinner, VoteBox } from "./styles";

type Cat = {
    id: string
    url: string
    funny: number
    total: number
    rate: number
}

export function Home() {
    const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

    const [catUrl, setCatUrl] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [catAlreadyOnDatabase, setCatAlreadyOnDatabase] = useState<boolean>(false)
    const [cat, setCat] = useState<Cat | null>(null)
    const [imageLoaded, setImageLoaded] = useState<boolean>(false)

    useEffect(() => {
        getCat();
    }, [])

    // Get random cat from cataas API
    // Store cat URL into a state and check if the cat has already shown up for someone
    // 

    const getCat = async () => {
        let { data, error } = await supabase
            .rpc('get_cat')
        
        if(error) 
            console.error("Error while trying to access Cataas API:", error)
        else {
            setCatUrl(data.url)
            setLoading(false)
            const catFromDb = await checkIfCatIsAlreadyOnDatabase(data._id)
            if(catFromDb) {
                setCatAlreadyOnDatabase(true)
                const newTotal = catFromDb[0].total + 1;
                setCat({
                    id: data._id,
                    url: data.url,
                    funny: catFromDb[0].funny,
                    total: newTotal,
                    rate: catFromDb[0].rate
                })
            }
            else {
                setCatAlreadyOnDatabase(false)
                setCat({
                    id: data._id,
                    url: data.url,
                    funny: 0,
                    total: 1,
                    rate: 0
                })
            }
        } 
    }

    const checkIfCatIsAlreadyOnDatabase = async (id: string) => {
        const { data } = await supabase
            .from('cats')
            .select('id, url, funny, total, rate')
            .eq('id', id)
        
        if(data?.length === 0) {
            console.log("New cat. Cat doesn't exist on db yet.")
            return null
        }

        console.log("Old cat. Cat already exists on db.")
        return data
    }

    const updateCat = async (id: string, funny: number, total: number, rate: number) => {
        const { error } = await supabase
            .from('cats')
            .update({ funny, total, rate })
            .eq('id', id)

        if(error)
            console.log(error)
    }

    const insertCat = async (id: string, url: string, funny: number, total: number, rate: number) => {
        const { error } = await supabase
            .from('cats')
            .insert({ id, url, funny, total, rate })

        if(error)
            console.log(error)
    }

    // Framer Motion stuffs:

    const x = useMotionValue(0);
    const xInput = [-100, 0, 100];

    const color = useTransform(x, xInput, [
        "rgb(223, 7, 7)",
        "rgb(0, 0, 0)",
        "rgb(3, 209, 0)"
    ]);

    const tickPath = useTransform(x, [10, 80], [0, 1]);
    const crossPathA = useTransform(x, [-10, -55], [0, 1]);
    const crossPathB = useTransform(x, [-50, -80], [0, 1]);

    const handleXChange = () => {
        // If already got a cat
        if(cat) {
            // if did not vote
            if (x.get() <= 80 && x.get() >= -80) { 
                return
            }
            // else if vote
            let funny = cat.funny;

            if (x.get() >= 80) {
                console.log("yes");
                funny++
                x.stop()
                setTimeout(() => {
                    x.set(0)
                }, 1000);
            }

            if (x.get() <= -80) {
                console.log("no");
                x.stop()
                setTimeout(() => {
                    x.set(0)
                }, 1000);
            }

            const newRate: number = (funny/cat.total)

            if(catAlreadyOnDatabase)
                updateCat(cat.id, funny, cat.total, newRate);
            else
                insertCat(cat.id, cat.url, funny, cat.total, newRate);

            setImageLoaded(false)
            setLoading(true);
            getCat();
        }
    };
    return (
        <MainContainer>
            <h1>Is this cat funny?</h1>

            <div>
                <span>Swipe left for <strong style={{ color: "rgb(223, 7, 7)" }}>no</strong></span>
                <span>Swipe right for <strong style={{ color: "rgb(3, 209, 0)" }}>yes</strong></span>
            </div>

            { loading || !imageLoaded && <Spinner />}

            <VoteBox
                className="box"
                style={{ x }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleXChange}
            >
                {
                    <>
                        <CurrentCatImage
                            onLoad={() => setImageLoaded(true)}
                            src={"https://cataas.com/" + catUrl}
                            alt="Cat"
                            className={`${!imageLoaded && 'disappear-img'}`}
                        />
                        <ProgressIcon className={`${!imageLoaded && 'disappear-svg'}`} viewBox="0 0 50 50">
                            <motion.path
                                fill="none"
                                strokeWidth="2"
                                stroke={color}
                                style={{ translateX: 5, translateY: 5 }}
                            />
                            <motion.path
                                fill="none"
                                strokeWidth="2"
                                stroke={color}
                                d="M14,26 L 22,33 L 35,16"
                                strokeDasharray="0 1"
                                style={{ pathLength: tickPath }}
                            />
                            <motion.path
                                fill="none"
                                strokeWidth="2"
                                stroke={color}
                                d="M17,17 L33,33"
                                strokeDasharray="0 1"
                                style={{ pathLength: crossPathA }}
                            />
                            <motion.path
                                fill="none"
                                strokeWidth="2"
                                stroke={color}
                                d="M33,17 L17,33"
                                strokeDasharray="0 1"
                                style={{ pathLength: crossPathB }}
                            />
                        </ProgressIcon>
                    </>
                }
            </VoteBox>
    </MainContainer>
  );
};
