import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";

<Header />
const members = [
    {
        name: "Hồ Thanh Tuấn Anh",
        image: "https://anhanime.com/wp-content/uploads/2022/05/A%CC%89nh-Anime-nam-nga%CC%82%CC%80u-5.jpg",
        github: "https://github.com/member1",
    },
    {
        name: "Nguyễn Hoàng Vũ",
        image: "https://i0.wp.com/recommendmeanime.com/wp-content/uploads/2023/01/Roughneck-Sumo-Wrestler-Matsutarou-anime.jpg?resize=640%2C360&ssl=1",
        github: "https://github.com/member2",
    },
    {
        name: "Cao Trần Cương",
        image: "https://static.tuoitre.vn/tto/i/s626/2017/04/29/voi-con-12-1493449938.jpg",
        github: "https://github.com/member3",
    },
    {
        name: "Nguyễn Thành Tuân",
        image: "https://absolutepool.files.wordpress.com/2023/07/img_6762.jpg?w=638",
        github: "https://github.com/member4",
    },
];
const AboutUsPage = () => {
    const resetPage = () => {
        // Your logic for resetting the page goes here
        // For example, you can use window.location.reload() to refresh the page
        window.location.reload();
    };

    return (
        <>
            <Header />
            <motion.div
                initial={{ opacity: 0, y: 75 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
            >
                <div className="container mx-auto text-center py-8">
                    <h2 className="text-3xl font-bold mb-4">About Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {members.map((member, index) => (
                            <div key={index} className="mb-8 md:w-1/2 lg:w-1/4">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-20 object-contain mb-2 rounded-full"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">{member.name}</h3>
                                    <a
                                        href={member.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500"
                                    >
                                        GitHub
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={resetPage}
                        className="bg-blue-500 text-white px-4 py-2 mt-8 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                        Reset Page
                    </button>
                </div>
            </motion.div>
        </>
    );
};

export default AboutUsPage;