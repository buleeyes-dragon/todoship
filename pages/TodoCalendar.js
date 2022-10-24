import Head from 'next/head'
// 导入 state
import {useState} from "react";
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Button, Checkbox, Grid, Row, Text, Tooltip,Modal,Input} from "@nextui-org/react";
import {Document, Calendar, Star, Setting, InfoCircle,Message} from 'react-iconly'
import colorMode from '../todoapp.config'
import AddPost from "./AddPosts";
import PostCard from './Postcard';
export default  async function TodoCalendar({post}) {
    console.log(post);
    // console.log(posts);
    return (
        <div className="bg-gray-100 dark:bg-gray-900 z-10 bg-transparent pl-5 pt-2 h-screen w-full">
            <AddPost/>
            <div>
                {/*如果post.length为0，则输出报错*/}
                {post.length === 0 ? (
                    <div className="flex justify-center items-center h-full">
                        <Text h3 size={14} className="text-gray-500 dark:text-gray-300">
                            没有日程
                        </Text>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {post.map((post) => (
                            <PostCard post={post} key={post.id}/>
                        ))}
                    </div>
                )}
                {/*{post.length === 0 ? (*/}
                {/*    <Text>No added posts</Text>*/}
                {/*) : (*/}
                {/*    <ul>*/}
                {/*        {post.map((post, i) => (*/}
                {/*            <PostCard post={post} key={i}/>*/}
                {/*        ))}*/}
                {/*    </ul>*/}
                {/*)}*/}
            </div>
        </div>
    );
}