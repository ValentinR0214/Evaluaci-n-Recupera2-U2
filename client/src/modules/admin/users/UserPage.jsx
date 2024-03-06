import { Badge, Button } from 'flowbite-react';
import React, { useEffect, useMemo } from 'react'
import { useState } from 'react';
import AxiosClient from '../../../config/http-gateway/http-client';
import TableComponent from '../../../components/TableComponent';
import { AiFillEdit, AiOutlineDelete, AiOutlineDoubleLeft } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { Label, TextInput,Card } from 'flowbite-react';



const UserPage = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState([]);
    const [filterText, setFilterText] = useState("");
    const colums = useMemo(() => [
        {
            name: "#",
            cell: (row, index) => <>{index + 1}</>,
            sortable: true,
            selector: (row, index) => index + 1,
        },
        {
            name: "Usuario",
            cell: (row, index) => <>{row.username}</>,
            sortable: true,
            selector: (row, index) => row.username,
        },
        {
            name: "Rol",
            cell: (row, index) => <>{row.roles[0].name}</>,
            sortable: true,
            selector: (row, index) => row.roles[0].name,
        },
        {
            name: "Estado",
            cell: (row) => <Badge color={row.status ? 'success':'failure'}>
                {row.status ? 'Activo' : 'Inactivo'}
            </Badge>,
            selector: () => row.status,
            sortable: true,
        },
        {
            name: "Acciones",
            cell: (row) => (
                <>
                    <Button outline size={'sm'} pill color='warning'>
                        {
                            <AiFillEdit />
                        }
                    </Button>
                    <Button outline size={'sm'} pill color={row.status ? "red":"success"}>
                        {row.status ? <AiOutlineDelete /> : <AiOutlineDoubleLeft />
                    }
                    </Button>
                </>
            ),
        },
    ]);

    const getUsers = async () => {
        try {
            setLoading(true);
            const response = await AxiosClient({
                url: "/user/",
                method: "GET",
            });
            console.log(response);
            if (!response.error) {
                setUser(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);


    const filter = () =>{
        return user.filter(user => user.username.includes(filterText))
    }

    return (
        <>
            <section className="flex flex-col pt-4 px-3">
                    <h4 className='text-2xl'>Usuarios</h4>

                <div className='flex w-full justify-between'>
                    <div className="max-w-md">
                    <Label htmlFor="search" value="Buscar" />
                    <TextInput 
                    id="search" 
                    type="email" 
                    rightIcon={IoIosSearch} 
                    value={filterText}
                    placeholder="Buscar..." 
                    onChange={(e) => setFilterText(e.target.value)} />
                    </div>
                    <div>
                    <Button pill outline color='success'>
                        Agregar
                    </Button>
                    </div>
                </div>

                <Card>
                    <TableComponent 
                    colums={colums} 
                    data={filter()} 
                    progress={loading} 
                    />
                </Card>
            </section>
        </>
    )
}

export default UserPage