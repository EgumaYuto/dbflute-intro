/*
 * Copyright 2014-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
package org.dbflute.intro.app.logic.core;

import org.dbflute.infra.dfprop.DfPublicProperties;
import org.dbflute.intro.app.logic.exception.EngineDownloadErrorException;
import org.dbflute.intro.app.logic.intro.IntroInfoLogic;

import javax.annotation.Resource;

/**
 * @author p1us2er0
 * @author jflute
 */
public class PublicPropertiesLogic {

    private static DfPublicProperties publicProperties; // cached

    @Resource
    private IntroInfoLogic introInfoLogic;

    public DfPublicProperties findProperties(boolean useSystemProxies) throws EngineDownloadErrorException {
        if (publicProperties != null) {
            return publicProperties;
        }
        try {
            introInfoLogic.setProxy(useSystemProxies);
            synchronized (PublicPropertiesLogic.class) {
                if (publicProperties != null) {
                    return publicProperties;
                }
                publicProperties = new DfPublicProperties();
                publicProperties.load();
                return publicProperties;
            }
        } catch (Exception e) {
            throw new EngineDownloadErrorException("Cannot download dbflute engine");
        }
    }
}
