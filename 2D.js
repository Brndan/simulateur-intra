function calculmutation() {
    document.getElementById('aAfficher').style.display = 'none';
    document.getElementById('resultat').style.display = 'none';
    /* */

    // -------- déclaration des valeurs de référence pour les points  -------------
    // ancienneté de poste
    const pt_anciennete_poste_par_an = 20;
    const pt_anciennete_poste_tous_les_x_ans = 50;
    const pt_anciennete_poste_x_ans = 4;
    const pt_anciennete_poste_forfait_stagiaire_ex_autre_corps = 20;
    // anciennet� de service (échelon)
    const pt_echelon_par_an = 7;
    const pt_echelon_normale_min = 14;
    const pt_echelon_hc_certifies_forfait = 56;
    const pt_echelon_hc_agreges_forfait = 63;
    const pt_echelon_exceptionnel_forfait = 77 ;
    const pt_echelon_max = 98;
    // situation familiale
    const pt_enfants = {0 : 0,
                                    1 : 10.2,
                                    2 : 20.2,
                                    3 : 30.2};
    // situation personnelle et administrative
    const pt_entree_metier = 10 ;
    const pt_stagiaire_ex_contractuel = {1 : 50,
                                         2 : 50,
                                         3 : 50,
                                         4 : 75,
                                         5 : 100,
                                         6 : 100,
                                         7 : 100,
                                         8 : 100,
                                         9 : 100,
                                         10: 100,
                                         11: 100};
    const pt_stagiaire_ex_autre = 50 ;
    const pt_education_prioritaire = {"none" : 0,
                                      "rep+" : 160,
                                      "rep"  : 80};
    const pt_carte_scolaire = 2000 ;
    const pt_reconversion = 60;
    const pt_TZR_REP = 200;
    const pt_sortie_FLS = 80;
    const pt_sortie_disp = 100;
    const pt_anciennete_paris = {"none" : 0,
                                 "8"    : 50,
                                 "12"   : 100};
    const pt_reintegration_autre = 1000;
    // vœux spécifiques
    const pt_voeu_preferenciel_annee = 20;
    const pt_demande_REP = 13;
    
     // --------   récupération de valeurs clés ---------
    // Récupération des valeurs de la partie communune
    let statut = document.getElementById('statut').value;
    let anciennete_poste = +document.getElementById('anciennete_poste').value;
    let classe = document.getElementById('classe').value;
    let echelon = +document.getElementById('echelon').value;
    // Récupération des données de situation familiale
    let enfants = +document.getElementById('enfants').value;
    // Récupération des données de situation personnelle
    let entree_metier = document.getElementById('entree_metier').checked;
    let contractuel_actif_avant_stage = document.getElementById('contractuel_actif_avant_stage').checked;
    let stagiaire_ex_autre = document.getElementById('stagiaire_ex_autre').checked;
    let situation_medicale = document.getElementById('situation_medicale').value;
    let education_prioritaire = document.getElementById('education_prioritaire').value;
    let carte_scolaire = document.getElementById('carte_scolaire').checked;
    let reconversion = document.getElementById('reconversion').checked;
    let agregees_lycee = document.getElementById('agregees_lycee').checked;
    let situation_TZR = document.getElementById('situation_TZR').value;
    let TZR_REP = document.getElementById('TZR_REP').checked;
    let sortie_FLS = document.getElementById('sortie_FLS').checked;
    let sortie_disp = document.getElementById('sortie_disp').checked;
    let anciennete_paris = document.getElementById('anciennete_paris').value;
    let reintegration_parental = document.getElementById('reintegration_parental').value;
    let reintegration_autre = document.getElementById('reintegration_autre').checked;
    // Récupération des données de vœux
    let voeu_preferenciel = document.getElementById('voeu_preferenciel').value;
    let demande_REP = document.getElementById('demande_REP').checked;
    
    /* -------------------------
                 CALCUL
       --------------------------   */

    // (1) pt_partie_commune = pt_anciennete_poste + pt_anciennete_service (echelon)
    let pt_partie_commune = 0;
    let ct_partie_commune = " ";

    let pt_anciennete_poste = 0;
    switch (statut) {
        case "titulaire":
            pt_anciennete_poste = anciennete_poste * pt_anciennete_poste_par_an
                + pt_anciennete_poste_tous_les_x_ans * Math.floor(anciennete_poste / pt_anciennete_poste_x_ans);
            break;
        case "stagiaire_ex_autre_corps":
            pt_anciennete_poste = anciennete_poste * pt_anciennete_poste_par_an
                + pt_anciennete_poste_tous_les_x_ans * Math.floor(anciennete_poste / pt_anciennete_poste_x_ans)
                + pt_anciennete_poste_forfait_stagiaire_ex_autre_corps;
            break;
        default:
            pt_anciennete_poste = 0;
    };
    let pt_anciennete_service = 0;
    switch (classe) {
        case "normale":
            pt_anciennete_service = Math.max(14, echelon * pt_echelon_par_an );
            break;
        case "hc_certifies":
            pt_anciennete_service = Math.min(pt_echelon_hc_certifies_forfait + echelon * pt_echelon_par_an , pt_echelon_max);
            break;
        case "hc_agreges":
            pt_anciennete_service = Math.min(pt_echelon_hc_agreges_forfait + echelon * pt_echelon_par_an , pt_echelon_max);
            break;
        case "exceptionnel":
            pt_anciennete_service = Math.min(pt_echelon_exceptionnel_forfait + echelon * pt_echelon_par_an , pt_echelon_max);
            break;
        default:
            pt_anciennete_service = 0;
    };
    pt_partie_commune = pt_anciennete_poste + pt_anciennete_service;

    // (2) pt_situation_familiale
    let pt_situation_familiale = 0;
    let ct_situation_familiale = " ";
    pt_situation_familiale = pt_enfants[enfants];
    if (pt_situation_familiale >= 1) {
        ct_situation_familiale = "Arrondissement de r&eacute;sidence de l'enfant<br/>";
    };
            
    
    // (3) pt_situation_personnelle
    let pt_situation_stage = 0;
    let ct_situation_stage = " ";
   if( ( statut = "stagiaire_ex_contractuel") && contractuel_actif_avant_stage) {
        pt_situation_stage = pt_situation_stage + pt_stagiaire_ex_contractuel[echelon];
        ct_situation_stage = "V&oelig;u 1 uniquement<br/>";
    } else if ( ( statut = "stagiaire") && entree_metier) {
        pt_situation_stage = pt_situation_stage + entree_metier * pt_entree_metier;
        ct_situation_stage = "V&oelig;u 1 uniquement<br/>";
    } else if ( ( statut = "stagiaire_ex_autre_corps") && stagiaire_ex_autre) {
        pt_situation_stage = pt_situation_stage + stagiaire_ex_autre * pt_stagiaire_ex_autre;
        ct_situation_stage = "V&oelig;u 1 uniquement<br/>";
    } else if (statut = "titulaire") {
            pt_situation_stage = 0;
            ct_situation_stage = " ";
    };
    
    let pt_situation_personnelle_medicale_1 = 0;
    let ct_situation_personnelle_medicale_1 = " ";
    switch (situation_medicale) {
        case "preconisations_drh":
            pt_situation_personnelle_medicale_1 = 1200;
            ct_situation_personnelle_medicale_1 = "Dossier n&eacute;cessaire.<br/>";
            break;
        case "rqth":
            pt_situation_personnelle_medicale_1 = 0;
            ct_situation_personnelle_medicale_1 = " ";
            break;
        case "none":
            pt_situation_personnelle_medicale_1 = 0;
            ct_situation_personnelle_medicale_1 = " ";
            break;
        default:
            pt_situation_personnelle_medicale_1 = 0;
            ct_situation_personnelle_medicale_1 = " ";
    };
    
    let pt_situation_personnelle_medicale_2 = 0;
    let ct_situation_personnelle_medicale_2 = " ";
    switch (situation_medicale) {
        case "rqth":
            pt_situation_personnelle_medicale_2 = 60;
            ct_situation_personnelle_medicale_2 = "Sous r&eacute;serve de la transmission du document justifiant de la qualit&eacute; de BOE en cours de validit&eacute;<br/>";
            break;
        case "preconisations_drh":
            pt_situation_personnelle_medicale_2 = 0;
            ct_situation_personnelle_medicale_2 = " ";
            break;
        case "none":
            pt_situation_personnelle_medicale_2 = 0;
            ct_situation_personnelle_medicale_2 = " ";
            break;
        default:
            pt_situation_personnelle_medicale_2 = 0;
            ct_situation_personnelle_medicale_2 = " ";
    };
    
    let pt_situation_carte = 0;
    let ct_situation_carte = " ";
    pt_situation_carte = carte_scolaire * pt_carte_scolaire;
    if (pt_situation_carte >= 1) {
        ct_situation_carte = "Carte scolaire : v&oelig;u lyc&eacute;e seulement pour les agr&eacute;g&eacute;&middot;es.<br/>";
    };
    
    let pt_situation_education_prioritaire = 0;
    let ct_situation_education_prioritaire = " ";
    pt_situation_education_prioritaire = pt_education_prioritaire[education_prioritaire];
    if (pt_situation_education_prioritaire >= 1) {
        ct_situation_education_prioritaire = " ";
    };
    
    let pt_situation_reconversion = 0;
    let ct_situation_reconversion = " ";
    pt_situation_reconversion = reconversion * pt_reconversion;
    
    let pt_agregees_lycee_ETB = 0;
    pt_agregees_lycee_ETB = agregees_lycee * 100;
    
    let pt_agregees_lycee_COM = 0;
    pt_agregees_lycee_COM = agregees_lycee * 150;
    
    let pt_agregees_lycee_GEO = 0;
    pt_agregees_lycee_GEO = agregees_lycee * 180;
    
    let pt_agregees_lycee_ACA = 0;
    pt_agregees_lycee_ACA = agregees_lycee * 200;
    
    let ct_agregees_lycee = " ";
    if (agregees_lycee) {
        ct_agregees_lycee = " ";
    };
    
    let pt_situation_personnelle_TZR_1 = 0;
    let ct_situation_personnelle_TZR_1 = " ";
    switch (situation_TZR) {
        case "3":
            pt_situation_personnelle_TZR_1 = 150;
            ct_situation_personnelle_TZR_1 = " ";
            break;
        case "1a4":
            pt_situation_personnelle_TZR_1 = 0;
            ct_situation_personnelle_TZR_1 = " ";
            break;
            case "5":
            pt_situation_personnelle_TZR_1 = 0;
            ct_situation_personnelle_TZR_1 = " ";
            break;
        case "none":
            pt_situation_personnelle_TZR_1 = 0;
            ct_situation_personnelle_TZR_1 = " ";
            break;
        default:
            pt_situation_personnelle_TZR_1 = 0;
            ct_situation_personnelle_TZR_1 = " ";
    };
    
    let pt_situation_personnelle_TZR_2 = 0;
    let ct_situation_personnelle_TZR_2 = " ";
    switch (situation_TZR) {
        case "1a4":
            pt_situation_personnelle_TZR_2 = 150;
            ct_situation_personnelle_TZR_2 = " ";
            break;
        case "5":
            pt_situation_personnelle_TZR_2 = 200;
            ct_situation_personnelle_TZR_2 = " ";
            break;
            case "3":
            pt_situation_personnelle_TZR_2 = 0;
            ct_situation_personnelle_TZR_2 = " ";
            break;
        case "none":
            pt_situation_personnelle_TZR_2 = 0;
            ct_situation_personnelle_TZR_2 = " ";
            break;
        default:
            pt_situation_personnelle_TZR_2 = 0;
            ct_situation_personnelle_TZR_2 = " ";
    };
    
    let pt_situation_TZR_REP = 0;
    let ct_situation_TZR_REP = " ";
    pt_situation_TZR_REP = TZR_REP * pt_TZR_REP;
    if (pt_situation_TZR_REP >= 1) {
        ct_situation_TZR_REP = "Valable uniquement sur l'&eacute;tablissement REP d'affectation.<br/>";
    };
    
    let pt_situation_sortie_FLS = 0;
    let ct_situation_sortie_FLS = " ";
    pt_situation_sortie_FLS = sortie_FLS * pt_sortie_FLS;
    if (pt_situation_sortie_FLS >= 1) {
        ct_situation_sortie_FLS = " ";
    };
    
    let pt_situation_sortie_disp = 0;
    let ct_situation_sortie_disp = " ";
    pt_situation_sortie_disp = sortie_disp * pt_sortie_disp;
    if (pt_situation_sortie_disp >= 1) {
        ct_situation_sortie_disp = " ";
    };
    
    let pt_situation_incomp = 0;
    let ct_situation_incomp = " ";

    //let casDeFigure = "";

   /*  console.log("pt_situation_education_prioritaire " + pt_situation_education_prioritaire)
    console.log("pt_situation_sortie_disp "+ pt_situation_sortie_disp)
    if ( (pt_situation_education_prioritaire > 1) && (pt_situation_sortie_disp > 1) )
        casDeFigure = "educPrioETsortie";
    if ( (pt_situation_education_prioritaire > 1) && (pt_situation_sortie_disp = "0") )
        casDeFigure = "educPrio";
    if ( (pt_situation_education_prioritaire = "0") && (pt_situation_sortie_disp > 1) )
        casDeFigure = "sortie";
    if ( (pt_situation_education_prioritaire = "0") && (pt_situation_sortie_disp = "0") )
        casDeFigure = "";

    switch ( casDeFigure ) {
        case "educPrioETsortie":
            alert("Educaton prio et sortie de dispositif");
            break;
        case "educPrio":
            alert("Education prio");
            break;
        case "sortie":
            alert("Sortie");
            break;
        default:
            break;
    } */

    if ( (pt_situation_education_prioritaire > 1) && (pt_situation_sortie_disp > 1) ) {
        if (pt_situation_education_prioritaire > pt_situation_sortie_disp) {
            pt_situation_incomp = pt_situation_education_prioritaire;
            ct_situation_incomp =  ct_situation_education_prioritaire + "ATTENTION: pas de cumul des points d'affectation en REP+ ou APV avec les points de sortie qui n'ont pas &eacute;t&eacute; pris en compte car moins int&eacute;ressants.<br/>";
        } else if (pt_situation_sortie_disp > pt_situation_education_prioritaire) {
            pt_situation_incomp = pt_situation_sortie_disp;
            ct_situation_incomp =  ct_situation_sortie_disp + "ATTENTION: pas de cumul des points de sortie avec les points d'affectation en REP qui n'ont pas &eacute;t&eacute; pris en compte car moins int&eacute;ressants.<br/>";
        }
    } else if ( (pt_situation_education_prioritaire > 1) && (pt_situation_sortie_disp = "0") ) {
            pt_situation_incomp = pt_situation_education_prioritaire;
            ct_situation_incomp = ct_situation_education_prioritaire;
        } else if ( (pt_situation_education_prioritaire = "0") && (pt_situation_sortie_disp > 1) ) {
            pt_situation_incomp = pt_situation_sortie_disp;
            ct_situation_incomp = ct_situation_sortie_disp;
        } else if ( (pt_situation_education_prioritaire = "0") && (pt_situation_sortie_disp = "0") ) {
            pt_situation_incomp = 0;
            ct_situation_incomp = " ";
        };
        
    let pt_situation_anciennete_paris = 0;
    let ct_situation_anciennete_paris = " ";
    pt_situation_anciennete_paris = pt_anciennete_paris[anciennete_paris];
    
    let pt_reintegration_parental_1 = 0;
    let ct_reintegration_parental_1 = " ";
    let ct_reintregration_parental_1_ZRA = " ";
    switch (reintegration_parental) {
        case "1000":
            pt_reintegration_parental_1 = 1000;
            ct_reintegration_parental_1 = "R&eacute;int&eacute;gration apr&egrave;s cong&eacute; parental : ordre &agrave; respecter : en rang 1 : ETB correspondant &agrave; l'&eacute;tablissement pr&eacute;c&eacute;dent, en rang 2 : COM tout poste correspondant &agrave; l'&eacute;tablissement pr&eacute;c&eacute;dent, en rang 3 : ACA tout poste correspondant &agrave; l'&eacute;tablissement pr&eacute;c&eacute;dent.<br/>";
            ct_reintregration_parental_1_ZRA = "V&oelig;u formul&eacute; en rang 1 si pr&eacute;c&eacute;demment TZR.<br/>";
            break;
        case "50":
            pt_reintegration_parental_1 = 0;
            ct_reintegration_parental_1 = " ";
            break;
        case "none":
            pt_reintegration_parental_1 = 0;
            ct_reintegration_parental_1 = " ";
            break;
        default:
            pt_reintegration_parental_1 = 0;
            ct_reintegration_parental_1 = " ";
            ct_reintregration_parental_1_ZRA = " ";
    };
    
    let pt_reintegration_parental_2 = 0;
    let ct_reintegration_parental_2 = " ";
    switch (reintegration_parental) {
        case "50":
            pt_reintegration_parental_2 = 50;
            ct_reintegration_parental_2 = "V&oelig;u 1 uniquement, correspondant au domicile.<br/>";
            break;
        case "1000":
            pt_reintegration_parental_2 = 0;
            ct_reintegration_parental_2 = " ";
            break;
        case "none":
            pt_reintegration_parental_2 = 0;
            ct_reintegration_parental_2 = " ";
            break;
        default:
            pt_reintegration_parental_2 = 0;
            ct_reintegration_parental_2 = " ";
        };
        
    let pt_situation_reintegration_autre = 0;
    let ct_situation_reintegration_autre_ACA = " ";
    let ct_situation_reintegration_autre_ZRA = " ";
    pt_situation_reintegration_autre = reintegration_autre * pt_reintegration_autre;
    if (pt_situation_reintegration_autre >= 1) {
        ct_situation_reintegration_autre_ACA = "V&oelig;u tout poste. Si pr&eacute;c&eacute;demment titulaire d'un &eacute;tablissement de Paris.<br/>";
        ct_situation_reintegration_autre_ZRA = "Si pr&eacute;c&eacute;demment TZR dans Paris.<br/>";
    };
    
    // (4) pt_voeu
    
    let pt_voeu_preferenciel = 0;
    let ct_voeu_preferenciel = " ";
    pt_voeu_preferenciel = voeu_preferenciel * pt_voeu_preferenciel_annee;
    if (pt_voeu_preferenciel >= 1) {
        ct_voeu_preferenciel = "V&oelig;u 1 uniquement (v&oelig;u pr&eacute;f&eacute;renciel).<br/>";
    };
    
    let pt_voeu_demande_REP = 0;
    let ct_voeu_demande_REP = " ";
    pt_voeu_demande_REP = demande_REP * pt_demande_REP;
    if (pt_voeu_demande_REP >= 1) {
        ct_voeu_demande_REP = " ";
    };
    
    pt_partie_commune = parseInt(pt_partie_commune);
    pt_situation_stage = parseInt(pt_situation_stage)
    pt_situation_personnelle_medicale_2 = parseInt(pt_situation_personnelle_medicale_2)
    pt_situation_personnelle_medicale_1 = parseInt(pt_situation_personnelle_medicale_1)
    pt_situation_carte = parseInt(pt_situation_carte)
    pt_situation_reconversion = parseInt(pt_situation_reconversion)
    pt_situation_education_prioritaire = parseInt(pt_situation_education_prioritaire)
    pt_situation_anciennete_paris = parseInt(pt_situation_anciennete_paris)
    pt_reintegration_parental_1 = parseInt(pt_reintegration_parental_1)
    pt_situation_reintegration_autre = parseInt(pt_situation_reintegration_autre)
    pt_agregees_lycee_ACA = parseInt(pt_agregees_lycee_ACA)
    pt_situation_personnelle_TZR_2 = parseInt(pt_situation_personnelle_TZR_2)
    pt_situation_TZR_REP = parseInt(pt_situation_TZR_REP)
    pt_situation_sortie_FLS = parseInt(pt_situation_sortie_FLS)
    pt_situation_incomp = parseInt(pt_situation_incomp)
    pt_agregees_lycee_GEO = parseInt(pt_agregees_lycee_GEO)
    pt_situation_familiale = parseFloat(pt_situation_familiale)
    pt_agregees_lycee_COM = parseInt(pt_agregees_lycee_COM)
    pt_situation_personnelle_TZR_1 = parseInt(pt_situation_personnelle_TZR_1)
    pt_reintegration_parental_2 = parseInt(pt_reintegration_parental_2)
    pt_voeu_preferenciel = parseInt(pt_voeu_preferenciel)




    // pt_total...
    let pt_total_ACA_base = pt_partie_commune + pt_situation_reconversion + pt_situation_anciennete_paris + pt_situation_personnelle_medicale_1 + pt_situation_stage;
    let pt_total_ACA_ttposte = pt_partie_commune + pt_situation_reconversion + pt_situation_anciennete_paris + pt_situation_personnelle_medicale_1 + pt_situation_stage + pt_situation_personnelle_medicale_2 + pt_situation_incomp + pt_situation_carte + pt_situation_personnelle_TZR_2 + pt_situation_sortie_FLS + pt_situation_reintegration_autre + pt_reintegration_parental_1;
    let pt_total_ACA_lycee = pt_partie_commune + pt_situation_reconversion + pt_situation_anciennete_paris + pt_situation_personnelle_medicale_1 + pt_situation_stage + pt_situation_carte + pt_agregees_lycee_ACA;
    let pt_total_GEO_base = pt_partie_commune +  pt_situation_reconversion + pt_situation_anciennete_paris + pt_situation_personnelle_medicale_1 + pt_situation_stage;
    let pt_total_GEO_ttposte = pt_partie_commune + pt_situation_reconversion + pt_situation_anciennete_paris + pt_situation_personnelle_medicale_1 + pt_situation_stage + pt_situation_personnelle_medicale_2 + pt_situation_incomp + pt_situation_personnelle_TZR_2 + pt_situation_sortie_FLS + pt_reintegration_parental_2;
    let pt_total_GEO_lycee = pt_partie_commune + pt_situation_reconversion + pt_situation_anciennete_paris + pt_situation_personnelle_medicale_1 + pt_situation_stage + pt_agregees_lycee_GEO;
    let pt_total_COM_base = pt_partie_commune +  pt_situation_reconversion + pt_situation_anciennete_paris + pt_situation_personnelle_medicale_1 + pt_situation_stage;
    let pt_total_COM_ttposte = pt_partie_commune + pt_situation_reconversion + pt_situation_anciennete_paris + pt_situation_personnelle_medicale_1 + pt_situation_stage + pt_situation_personnelle_medicale_2 + pt_situation_incomp + pt_situation_carte + pt_voeu_preferenciel + pt_situation_personnelle_TZR_1 + pt_situation_sortie_FLS + pt_situation_familiale + pt_reintegration_parental_1;
    let pt_total_COM_lycee = pt_partie_commune + pt_situation_reconversion + pt_situation_anciennete_paris + pt_situation_personnelle_medicale_1 + pt_situation_stage + pt_situation_carte + pt_agregees_lycee_COM;
    let pt_total_ETB_base = pt_partie_commune + pt_situation_reconversion + pt_situation_anciennete_paris + pt_situation_personnelle_medicale_1 + pt_situation_stage;
    let pt_total_ETB_ttposte = pt_partie_commune + pt_situation_reconversion + pt_situation_anciennete_paris + pt_situation_personnelle_medicale_1 + pt_situation_stage + pt_reintegration_parental_1;
    let pt_total_ETB_lycee = pt_partie_commune + pt_situation_reconversion + pt_situation_anciennete_paris + pt_situation_personnelle_medicale_1 + pt_situation_stage + pt_agregees_lycee_ETB;
    let pt_total_ETB_REP = pt_partie_commune + pt_situation_reconversion + pt_situation_anciennete_paris + pt_situation_personnelle_medicale_1 + pt_situation_stage + pt_voeu_demande_REP + pt_situation_TZR_REP;
    let pt_total_ZRA = pt_partie_commune + pt_situation_stage + pt_situation_personnelle_medicale_2 + pt_situation_reconversion + pt_situation_education_prioritaire + pt_situation_anciennete_paris + pt_reintegration_parental_1 + pt_situation_reintegration_autre;
    
    let ct_total_ACA_base = ct_partie_commune + ct_situation_reconversion + ct_situation_anciennete_paris + ct_situation_personnelle_medicale_1 + ct_situation_stage;
    let ct_total_ACA_ttposte = ct_partie_commune + ct_situation_reconversion + ct_situation_anciennete_paris + ct_situation_personnelle_medicale_1 + ct_situation_stage + ct_situation_personnelle_medicale_2 + ct_situation_carte + ct_situation_personnelle_TZR_2 + ct_situation_sortie_FLS + ct_situation_incomp + ct_situation_reintegration_autre_ACA + ct_reintegration_parental_1;
    let ct_total_ACA_lycee = ct_partie_commune + ct_situation_reconversion + ct_situation_anciennete_paris + ct_situation_personnelle_medicale_1 + ct_situation_stage + ct_situation_carte;
    let ct_total_GEO_base = ct_partie_commune + ct_situation_reconversion + ct_situation_anciennete_paris + ct_situation_personnelle_medicale_1 + ct_situation_stage;
    let ct_total_GEO_ttposte = ct_partie_commune + ct_situation_reconversion + ct_situation_anciennete_paris + ct_situation_personnelle_medicale_1 + ct_situation_stage + ct_situation_personnelle_medicale_2 + ct_situation_personnelle_TZR_2 + ct_situation_sortie_FLS + ct_situation_incomp;
    let ct_total_GEO_lycee = ct_partie_commune + ct_situation_reconversion + ct_situation_anciennete_paris + ct_situation_personnelle_medicale_1 + ct_situation_stage;
    let ct_total_COM_base = ct_partie_commune + ct_situation_reconversion + ct_situation_anciennete_paris + ct_situation_personnelle_medicale_1 + ct_situation_stage;
    let ct_total_COM_ttposte = ct_partie_commune + ct_situation_reconversion + ct_situation_anciennete_paris + ct_situation_personnelle_medicale_1 + ct_situation_stage + ct_situation_personnelle_medicale_2 + ct_situation_carte + ct_voeu_preferenciel + ct_situation_personnelle_TZR_1 + ct_situation_sortie_FLS + ct_situation_incomp + ct_situation_familiale + ct_reintegration_parental_2 + ct_reintegration_parental_1;
    let ct_total_COM_lycee = ct_partie_commune + ct_situation_reconversion + ct_situation_anciennete_paris + ct_situation_personnelle_medicale_1 + ct_situation_stage + ct_situation_carte;
    let ct_total_ETB_base = ct_partie_commune + ct_situation_reconversion + ct_situation_anciennete_paris + ct_situation_personnelle_medicale_1 + ct_situation_stage;
    let ct_total_ETB_ttposte = ct_partie_commune + ct_situation_reconversion + ct_situation_anciennete_paris + ct_situation_personnelle_medicale_1 + ct_situation_stage + ct_reintegration_parental_1;
    let ct_total_ETB_lycee = ct_partie_commune + ct_situation_reconversion + ct_situation_anciennete_paris + ct_situation_personnelle_medicale_1 + ct_situation_stage;
    let ct_total_ETB_REP = ct_partie_commune + ct_situation_reconversion + ct_situation_anciennete_paris + ct_situation_personnelle_medicale_1 + ct_situation_stage + ct_situation_TZR_REP;
    let ct_total_ZRA = ct_partie_commune + ct_situation_stage + ct_situation_personnelle_medicale_2 + ct_situation_reconversion + ct_reintregration_parental_1_ZRA + ct_situation_reintegration_autre_ZRA;
    // NON CUMUL : poste REP+/APV/REP et sortie classe relais, �tablissements sanitaires et m�dico-sociaux, ULIS et UPR --> OK


    // rounding to avoid decimal issues ( see http://adripofjavascript.com/blog/drips/avoiding-problems-with-decimal-math-in-javascript.html )
    pt_partie_commune = pt_partie_commune.toFixed(1);
    pt_situation_familiale = pt_situation_familiale.toFixed(1);
    pt_total_ACA_base = pt_total_ACA_base.toFixed(1);
    pt_total_ACA_ttposte = pt_total_ACA_ttposte.toFixed(1);
    pt_total_ACA_lycee = pt_total_ACA_lycee.toFixed(1);
    pt_total_GEO_base = pt_total_GEO_base.toFixed(1);
    pt_total_GEO_ttposte = pt_total_GEO_ttposte.toFixed(1);
    pt_total_GEO_lycee = pt_total_GEO_lycee.toFixed(1);
    pt_total_COM_base = pt_total_COM_base.toFixed(1);
    pt_total_COM_ttposte = pt_total_COM_ttposte.toFixed(1);
    pt_total_COM_lycee = pt_total_COM_lycee.toFixed(1);
    pt_total_ETB_base = pt_total_ETB_base.toFixed(1);
    pt_total_ETB_ttposte = pt_total_ETB_ttposte.toFixed(1);
    pt_total_ETB_lycee = pt_total_ETB_lycee.toFixed(1);
    pt_total_ETB_REP = pt_total_ETB_REP.toFixed(1);
    pt_total_ZRA = pt_total_ZRA.toFixed(1);

    //Affichage du r�sultat
    document.getElementById("pt_total_ACA_base").innerHTML = pt_total_ACA_base + " pts";
    document.getElementById("ct_total_ACA_base").innerHTML = ct_total_ACA_base ;
    document.getElementById("pt_total_ACA_ttposte").innerHTML = pt_total_ACA_ttposte + " pts";
    document.getElementById("ct_total_ACA_ttposte").innerHTML = ct_total_ACA_ttposte ;
    document.getElementById("pt_total_ACA_lycee").innerHTML = pt_total_ACA_lycee + " pts";
    document.getElementById("ct_total_ACA_lycee").innerHTML = ct_total_ACA_lycee ;
    document.getElementById("pt_total_GEO_base").innerHTML = pt_total_GEO_base + " pts";
    document.getElementById("ct_total_GEO_base").innerHTML = ct_total_GEO_base ;
    document.getElementById("pt_total_GEO_ttposte").innerHTML = pt_total_GEO_ttposte + " pts";
    document.getElementById("ct_total_GEO_ttposte").innerHTML = ct_total_GEO_ttposte ;
    document.getElementById("pt_total_GEO_lycee").innerHTML = pt_total_GEO_lycee + " pts";
    document.getElementById("ct_total_GEO_lycee").innerHTML = ct_total_GEO_lycee ;
    document.getElementById("pt_total_COM_base").innerHTML = pt_total_COM_base + " pts";
    document.getElementById("ct_total_COM_base").innerHTML = ct_total_COM_base ;
    document.getElementById("pt_total_COM_ttposte").innerHTML = pt_total_COM_ttposte + " pts";
    document.getElementById("ct_total_COM_ttposte").innerHTML = ct_total_COM_ttposte ;
    document.getElementById("pt_total_COM_lycee").innerHTML = pt_total_COM_lycee + " pts";
    document.getElementById("ct_total_COM_lycee").innerHTML = ct_total_COM_lycee ;
    document.getElementById("pt_total_ETB_base").innerHTML = pt_total_ETB_base + " pts";
    document.getElementById("ct_total_ETB_base").innerHTML = ct_total_ETB_base ;
    document.getElementById("pt_total_ETB_ttposte").innerHTML = pt_total_ETB_ttposte + " pts";
    document.getElementById("ct_total_ETB_ttposte").innerHTML = ct_total_ETB_ttposte ;
    document.getElementById("pt_total_ETB_lycee").innerHTML = pt_total_ETB_lycee + " pts";
    document.getElementById("ct_total_ETB_lycee").innerHTML = ct_total_ETB_lycee ;
    document.getElementById("pt_total_ETB_REP").innerHTML = pt_total_ETB_REP + " pts";
    document.getElementById("ct_total_ETB_REP").innerHTML = ct_total_ETB_REP ;
    document.getElementById("pt_total_ZRA").innerHTML = pt_total_ZRA + " pts";
    document.getElementById("ct_total_ZRA").innerHTML = ct_total_ZRA ;


    document.getElementById('aAfficher').style.display = 'block';
    document.getElementById('resultat').style.display = 'block';
};

// Afficher les menus  et les div nécessaires
function showFormItem(it, displaybool) {
    var vis = displaybool ? "block" : "none";
    document.getElementById(it).style.display = vis;
};

function showFormItemWhen(it, selectorId, optionValues) {
    var vis = "none";
    if (optionValues.includes(document.getElementById(selectorId).value) ) {
        vis = "block";
    } else {
        vis = "none";
    }
    document.getElementById(it).style.display = vis;
};