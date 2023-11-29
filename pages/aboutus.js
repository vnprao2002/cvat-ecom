
import React from 'react';
import styles from '../public/Home.module.css';
import Header from "@/components/Header";


const members = [
    {
        name: 'Hồ Thanh Tuấn Anh',
        phone: '207CT68610',
        image: 'data:image/jpeg;base64,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',
    },
    {
        name: 'Cao Trần Cương',
        phone: '207CT68615',
        image: 'https://stockdep.net/files/images/41721903.jpg',
    },
    {
        name: 'Nguyễn Hoàng Vũ',
        phone: '207CT65888',
        image: 'https://vcdn1-giaitri.vnecdn.net/2019/06/08/dovatjohnCena-1559963405-6646-1559963411.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=LLAGBugp8qXaHdhw1iQVkA',
    },
    {
        name: 'Nguyễn Thành Tuân',
        phone: '207CT65872',
        image: 'https://absolutepool.files.wordpress.com/2023/08/img_6839.jpg?w=1024',
    },
];
const AboutUs = () => {
    return (
        <div>
            <Header />
            <div className={styles.container}>
                {members.map((member, index) => (
                    <div key={index} className={styles.member}>
                        <img src={member.image} alt={`Member ${index + 1}`} />
                        <div className={styles.info}>
                            <h3>{member.name}</h3>
                            <p>{member.phone}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.githubButtonsContainer}>
                <a href="https://github.com/vnprao2002/cvat-ecom" target="_blank" rel="noopener noreferrer">
                    <button className={styles.githubButton} aria-label="Github of User 1">
                        <p>Source code Trang chính</p>
                    </button>
                </a>
                <a href="https://github.com/vnprao2002/ecommerce-admin-master" target="_blank" rel="noopener noreferrer">
                    <button className={styles.githubButton} aria-label="Github of User 2">
                        <p>Source code Trang Backoffice</p>
                    </button>
                </a>
            </div >
        </div >
    );
};

export default AboutUs;