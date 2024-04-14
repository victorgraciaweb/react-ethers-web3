import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const { ethereum } = window as any;

export function Balance() {
    const [cuenta, setCuenta] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);

    useEffect(() => {
        if (ethereum) {
            ethereum.request({ method: "eth_requestAccounts" })
            .then((cuentas: string[]) => {
                setCuenta(cuentas[0])
                ethereum.on('accountsChanged', (nuevasCuentas: string[]) => {
                    setCuenta(nuevasCuentas[0]);
                });
            })
            .catch((error: any) => {
                console.error(error); 
            });
        }
    }, []);

    useEffect(() => {
        if (cuenta) {
           const provider = new ethers.BrowserProvider(ethereum)
           provider.getBalance(cuenta).then(balance =>{
                setBalance(ethers.formatEther(balance));
           })
        }
    }, [cuenta]);


    if (!ethereum) {
        return <div>No hay conexión con MetaMask</div>
    }

    return (
        <div>
            <p>{
                cuenta ? cuenta : 'Cargando...'
            }
            </p>
            <p>
            {
                balance ? balance : 'Cargando...'
            }
            </p>
        </div>
    )
}