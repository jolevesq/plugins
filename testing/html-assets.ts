


export const form:string = 
`<div tabindex="-2" ng-controller="SubmitCtrl as ctrl">
    {{ 'plugins.testing.envir' | translate }}<br>
    <input type="text" name="env" id="env" value="Pro">
    <br>

    Sélectionner le thème:<br>
    <select type="text" name="theme" id="theme" placeholder="Select something">
    
    </select>
    <br>

    Sélectionner la source de la zone de travail:<br>
    <input type="text" name="ZT" id="ZT" value="1">
    <br>

    Sélectionner le type de travail:<br>
    <input type="text" name="TT" value="Ajout">
    <br>
    Ajouter une géométrie:<br>
    <input type="text" name="geom" id="geom" value="geom">
    <br>

    Date de fin prévue:<br>
    <input type="date" name="datefin">
    <br><br>

    <div>
    <md-button class="md-primary md-button"
        ng-click="ctrl.submitForm()">
        {{ 'plugins.testing.submit' | translate }}
        <md-tooltip>{{ 'plugins.testing.submit' | translate }}</md-tooltip>
    </md-button>
    </div>
</div>`;