import { IonCard, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonPage, IonRow, IonText, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import axios from 'axios';
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { useParams } from "react-router-dom";

const Tab2: React.FC = () => {
  const [post, setPost] = useState<any>();

  const  id  = (useParams());
  const ar=JSON.parse(JSON.stringify(id));
  if(!localStorage.getItem('token')){
    window.location.href='http://localhost:8100';
  }

  useEffect(() => {
    const getData = async () => {
    
      await axios.get(
        "http://localhost:8080/vehicules/"+ar.id
      ).then(async(res:any) => {
        setPost(res?.data);
      });
    };
    getData();
  });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>

              {/* {
                (JSON.stringify(post))              
              } */}

                <IonItem>Vehicule Matricule {post?.matricule}</IonItem>
                <div className="col col-33">
                  <img className="full-image" src={"data:image/jpeg;base64,"+post?.image} />
                </div><br></br>
                <IonItem>Marque {post?.marque}</IonItem>
                <IonItem>Annee de sortie {post?.annee}</IonItem>
              
        <IonGrid>
          <IonRow>
              <IonCol>Dates</IonCol>
              <IonCol>Debut</IonCol>
              <IonCol>Fin</IonCol>
          </IonRow>
          {

            post?.dates?.map((data:any,i:any) => {
              
              return (
                <IonRow key={i}>
                  {/* <IonCol>{data}</IonCol> */}
                  <IonCol>{post?.dates[i]}</IonCol>
                  <IonCol>{post?.debut[i]}</IonCol>
                  <IonCol>{post?.fin[i]}</IonCol>
                </IonRow>
              );
            })
          }
          </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
